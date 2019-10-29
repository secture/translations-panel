import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {UserState} from "../../store/user/types";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';
import FormUsers from "./formUsers";
import {initialUserState} from "../../store/user/reducers";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';

import {dashboardViewStyles} from "../../styles/dashboard";
import {Button, Toolbar, Typography} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {TranslationsStore} from "../../store/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {getAllLocales} from "../../services/locale";
import {connect} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {deleteUser} from "../../services/user";

const userListStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    tableTitle: {
        flex: '1 1 100%',
    },
    table: {
        minWidth: 650,
    },
    button: {
        margin: theme.spacing(1),
    },
    color: {
        backgroundColor: theme.palette.grey.A100
    },
    actions: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const UsersList: React.FC<any> = (props: AppProps) => {
    const [showForm, setShowForm] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [actionForm, setActionForm] = useState('create');
    const [userSelected, setUserSelected] = useState(initialUserState);

    const classes = Object.assign(userListStyles(), dashboardViewStyles());

    useEffect(() => {
        if (props.locales.length === 0) {
            props.getLocalesAction();
        }
    }, []);

    const loadFormAddUser = () => {
        setActionForm('create');
        setUserSelected(initialUserState);
        setShowForm(true);
    };

    const loadFormEditUser = (user: UserState) => {
        setActionForm('update');
        setUserSelected(user);
        setShowForm(true);
    };

    const deleteUser = (user: UserState) => {
        setUserSelected(user);
        setOpenModal(!openModal);
    };

    const confirmDeleteUser = () => {
        props.deleteUserAction(userSelected.id).then((response: any) => {
            console.log(response);
        });
        setOpenModal(!openModal);
    };

    return (
        <Grid item xs={12}>
            <Slide direction="up" in={!showForm} style={{ transitionDelay: !showForm ? '150ms' : '0ms' }} mountOnEnter unmountOnExit>
                <Paper className={classes.root}>
                    <Toolbar>
                        <Typography className={classes.tableTitle} variant="h6" id="tableTitle">
                            Users
                        </Typography>
                        {props.user.privilege === 'Admin' && <IconButton aria-label="add" onClick={() => loadFormAddUser()} className={`${classes.color}`}>
                            <AddCircleOutlineIcon color="primary"/>
                        </IconButton>}
                    </Toolbar>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Role</TableCell>
                                <TableCell align="left">Languages</TableCell>
                                <TableCell align="left">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.users.map((userRow: UserState) => (
                                <TableRow key={userRow.id}>
                                    <TableCell component="th" scope="row">
                                        {userRow.name}
                                    </TableCell>
                                    <TableCell align="left">{userRow.email}</TableCell>
                                    <TableCell align="left">{userRow.privilege}</TableCell>
                                    <TableCell align="left">
                                        {userRow.associatedLanguages.map((language) =>
                                            <Chip label={language} variant="outlined" color="primary"/>
                                        )}
                                    </TableCell>
                                    <TableCell align="left" className={classes.actions}>
                                        {(props.user.id === userRow.id || props.user.privilege === 'Admin') && <IconButton onClick={() => loadFormEditUser(userRow)} aria-label="edit" className={`${classes.button} ${classes.color}`}>
                                            <EditIcon color="primary" />
                                        </IconButton>}
                                        <IconButton onClick={() => deleteUser(userRow)} aria-label="delete" className={`${classes.button} ${classes.color}`}>
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Slide>
            <Slide direction="up" in={showForm} style={{ transitionDelay: showForm ? '150ms' : '0ms' }} mountOnEnter unmountOnExit>
                <Paper className={classes.root}>
                    <FormUsers user={userSelected} setShowForm={setShowForm} action={actionForm}/>
                </Paper>
            </Slide>
            <Dialog
                open={openModal}
                onClose={() => {setOpenModal(!openModal)}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure to delete this locale?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Name: {userSelected.name}
                        <br/>
                        Email: {userSelected.email}
                        <br/>
                        Role: {userSelected.privilege}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpenModal(!openModal)}} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {confirmDeleteUser()}} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

const mapStateToProps = (store: TranslationsStore, props: any) => {
    return {
        locales: store.locale,
        users: props.users,
        user: props.user,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getLocalesAction: () => dispatch(getAllLocales()),
        deleteUserAction: (id: string) => dispatch(deleteUser(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UsersList);
