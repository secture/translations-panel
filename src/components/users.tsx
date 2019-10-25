import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {UserState} from "../store/user/types";
import {UsersState} from "../store/users/types";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';
import FormUsers from "./common/formUsers";
import {initialUserState} from "../store/user/reducers";
import Grid from "@material-ui/core/Grid";

const userListStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
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

const Users: React.FC<any> = ({users}: UsersState) => {
    const [showForm, setShowForm] = useState(false);
    const [userSelected, setUserSelected] = useState(initialUserState);

    const classes = userListStyles();

    function editUser(user: UserState){
        setShowForm(true);
        setUserSelected(user);
        console.log(user);
    }

    function deleteUser(user: UserState) {
        console.log(user);
    }

    return (
        <Grid item xs={12}>
            <Slide direction="up" in={!showForm} style={{ transitionDelay: !showForm ? '150ms' : '0ms' }} mountOnEnter unmountOnExit>
                <Paper className={classes.root}>
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
                            {users.map((user: UserState) => (
                                <TableRow key={user.name}>
                                    <TableCell component="th" scope="row">
                                        {user.name}
                                    </TableCell>
                                    <TableCell align="left">{user.email}</TableCell>
                                    <TableCell align="left">{user.privilege}</TableCell>
                                    <TableCell align="left">{user.associatedLanguages}</TableCell>
                                    <TableCell align="left" className={classes.actions}>
                                        <IconButton onClick={() => editUser(user)} aria-label="edit" className={`${classes.button} ${classes.color}`}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => deleteUser(user)} aria-label="delete" className={`${classes.button} ${classes.color}`}>
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
                    <FormUsers user={userSelected} setShowForm={setShowForm}/>
                </Paper>
            </Slide>
        </Grid>
    );
};

export default Users;
