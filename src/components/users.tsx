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
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

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
}));

const Users: React.FC<any> = ({users}: UsersState) => {
    const [showForm, setShowForm] = useState(false);
    const classes = userListStyles();

    function editUser(user: UserState){
        setShowForm(true);
        console.log(user);
    }

    function deleteUser(user: UserState) {
        console.log(user);
    }

    return (
        <div>
            <Slide direction="up" in={!showForm} style={{ transitionDelay: !showForm ? '200ms' : '0ms' }} mountOnEnter unmountOnExit>
                <Paper className={classes.root}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="right">Languages</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user: UserState) => (
                                <TableRow key={user.name}>
                                    <TableCell component="th" scope="row">
                                        {user.name}
                                    </TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.privilege}</TableCell>
                                    <TableCell align="right">{user.associatedLanguages}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => editUser(user)} className={classes.button} aria-label="edit">
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => deleteUser(user)} className={classes.button} aria-label="delete">
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Slide>
            <Slide direction="up" in={showForm} style={{ transitionDelay: showForm ? '200ms' : '0ms' }} mountOnEnter unmountOnExit>
                <Paper className={classes.root}>
                    Formulario de edicion
                    <IconButton onClick={() => setShowForm(false)} className={classes.button} aria-label="close">
                        <CloseIcon color="secondary" />
                    </IconButton>
                </Paper>
            </Slide>
        </div>
    );
};

export default Users;
