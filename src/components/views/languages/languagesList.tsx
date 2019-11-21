import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import PermissionsProvider from "components/common/PermissionsProvider";

import {LanguageState} from "store/languages/types";
import {
    Fab,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import {initialLanguage} from "store/languages/reducers";
import {allowedRoles} from "store";

const languagesListStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            overflowX: 'auto',
            flexGrow: 1,
        },
        fab: {
            margin: theme.spacing(1),
        },
        table: {
            minWidth: 650,
        },
        tableTitle: {
            flex: '1 1 100%',
        },
        button: {
            margin: theme.spacing(1),
        },
        icon: {
            fontSize: '28px',
        }
    })
);

interface PropsLanguagesList {
    languages: LanguageState[],
    setLanguageSelected: (language: LanguageState) => void,
    showForm: boolean,
    setShowForm: (show: boolean) => void,
    openDialog: () => void,
    setEditForm: (isEditForm: boolean) => void
}

const LanguagesList: React.FC<any> = (props: PropsLanguagesList) => {
    const classes = languagesListStyles();

    const loadFormAddLanguage = () => {
        props.setEditForm(false);
        props.setLanguageSelected(initialLanguage);
        props.setShowForm(true);
    };

    const loadFormEditLanguage = (language: LanguageState) => {
        props.setEditForm(true);
        props.setLanguageSelected(language);
        props.setShowForm(true);
    };

    const openDeleteModal = (language: LanguageState) => {
        props.setLanguageSelected(language);
        props.openDialog();
    };

    return (
        <Paper className={classes.root}>
            <Toolbar>
                <Typography className={classes.tableTitle} variant="h6" id="tableTitle">
                    Languages
                </Typography>
                <PermissionsProvider child={<IconButton aria-label="add" onClick={() => loadFormAddLanguage()}>
                    <AddCircleOutlineIcon/>
                </IconButton>} privileges={['Admin']}/>
            </Toolbar>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">KEY</TableCell>
                        <TableCell align="right">FLAG</TableCell>
                        <TableCell align="right">NAME</TableCell>
                        <TableCell align="right">FOR PLAYERS</TableCell>
                        <PermissionsProvider child={<TableCell align="right">OPTIONS</TableCell>} privileges={allowedRoles}/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.languages.map((row: LanguageState) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell align="right">{row.key}</TableCell>
                            <TableCell align="right" className={classes.icon}>{row.icon}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">
                                {row.localeForPlayers ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                            </TableCell>
                            <PermissionsProvider child={<TableCell align="right">
                                <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                     onClick={() => loadFormEditLanguage(row)}>
                                    <EditIcon/>
                                </Fab>
                                <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                     onClick={() => openDeleteModal(row)}>
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

export default LanguagesList;
