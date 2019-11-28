import React from 'react';
import {allowedRoles} from "store";
import {UserState} from "store/user/types";
import {initialUserState} from "store/user/reducers";
import {LanguageState} from "store/languages/types";

import {
    Fab,
    Chip,
    Paper,
    Toolbar,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton
} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {dashboardViewStyles} from "styles/dashboard";
import {tableStyles} from 'styles/table'
import PermissionsProvider from "components/common/permissionsProvider";

interface PropsUsersList {
    users: UserState[],
    user: UserState,
    languages: LanguageState[],
    setUserSelected: (user: UserState) => void,
    setEditForm: (isEditForm: boolean) => void,
    setShowForm: (show: boolean) => void,
    openDialog: () => void,
}

const UsersList: React.FC<any> = (props: PropsUsersList) => {
    const classes = Object.assign(tableStyles(), dashboardViewStyles());

    const loadFormAddUser = () => {
        props.setEditForm(false);
        props.setUserSelected(initialUserState);
        props.setShowForm(true);
    };

    const loadFormEditUser = (user: UserState) => {
        props.setEditForm(true);
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
                <PermissionsProvider child={<IconButton aria-label="add" onClick={() => loadFormAddUser()}>
                    <AddCircleOutlineIcon color="primary"/>
                </IconButton>} privileges={allowedRoles}/>
            </Toolbar>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="left">Languages</TableCell>
                        <PermissionsProvider child={<TableCell align="left">Actions</TableCell>}
                                             privileges={allowedRoles}/>
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
                                {userRow.associatedLanguages.map((language: LanguageState) =>
                                    <Chip key={'chip_language' + language.key} label={language.key} variant="outlined"
                                          color="primary"/>
                                )}
                            </TableCell>

                            <PermissionsProvider child={<TableCell align="right">
                                <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                     onClick={() => loadFormEditUser(userRow)}>
                                    <EditIcon/>
                                </Fab>
                                <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                     onClick={() => deleteUser(userRow)}>
                                    <DeleteIcon/>
                                </Fab>
                            </TableCell>} privileges={allowedRoles}/>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default UsersList;
