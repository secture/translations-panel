import React from 'react';
import {UserState} from "store/user/types";
import {initialUserState} from "store/user/reducers";
import {LanguageState} from "store/languages/types";

import {Toolbar, Typography} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import {dashboardViewStyles} from "styles/dashboard";
import {tableStyles} from 'styles/table'
import PermissionsProvider from "components/common/permissionsProvider";
import {allowedRoles} from "store";

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
                        <PermissionsProvider child={<TableCell align="left">Actions</TableCell>} privileges={allowedRoles} />
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
                                    <Chip label={language.key} variant="outlined" color="primary"/>
                                )}
                            </TableCell>
                            <PermissionsProvider child={
                                <TableCell align="left" className={classes.actions}>
                                    <IconButton onClick={() => loadFormEditUser(userRow)} aria-label="edit" className={`${classes.button}`}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteUser(userRow)} aria-label="delete" className={`${classes.button}`}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>} privileges={allowedRoles} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default UsersList;
