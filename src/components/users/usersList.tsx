import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {AssociatedLanguage, UserState} from "../../store/user/types";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {initialUserState} from "../../store/user/reducers";
import Chip from '@material-ui/core/Chip';

import {dashboardViewStyles} from "../../styles/dashboard";
import {Toolbar, Typography} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {TranslationsStore} from "../../store/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {getAllLocales} from "../../services/locale";
import {connect} from "react-redux";

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
    const classes = Object.assign(userListStyles(), dashboardViewStyles());

    useEffect(() => {
        if (props.locales.length === 0) {
            props.getLocalesAction();
        }
    }, []);

    const loadFormAddUser = () => {
        props.setTypeForm('create');
        props.setUserSelected(initialUserState);
        props.setShowForm(true);
    };

    const loadFormEditUser = (user: UserState) => {
        props.setTypeForm('update');
        props.setUserSelected(user);
        props.setShowForm(true);
    };

    const deleteUser = (user: UserState) => {
        props.setUserSelected(user);
        props.openDialog();
    };

    return (
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
                                {userRow.associatedLanguages.map((language: AssociatedLanguage) =>
                                    <Chip label={language.key} variant="outlined" color="primary"/>
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
    );
};

const mapStateToProps = (store: TranslationsStore, props: any) => {
    return {
        users: props.users,
        user: props.user,
        locales: store.locale,
        setUserSelected: props.setUserSelected,
        setTypeForm: props.setTypeForm,
        setShowForm: props.setShowForm,
        openDialog: props.openDialog,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getLocalesAction: () => dispatch(getAllLocales()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UsersList);
