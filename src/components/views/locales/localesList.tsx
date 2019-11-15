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

import {LocaleState} from "store/locales/types";
import {
    Fab,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import {initialLocale} from "store/locales/reducers";

const localesListStyles = makeStyles((theme: Theme) =>
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

interface PropsLocalesList {
    locales: LocaleState[],
    setLocaleSelected: (locale: LocaleState) => void,
    showForm: boolean,
    setShowForm: (show: boolean) => void,
    openDialog: () => void,
    setEditForm: (isEditForm: boolean) => void
}

const LocalesList: React.FC<any> = (props: PropsLocalesList) => {
    const classes = localesListStyles();

    const loadFormAddLocale = () => {
        props.setEditForm(false);
        props.setLocaleSelected(initialLocale);
        props.setShowForm(true);
    };

    const loadFormEditLocale = (locale: LocaleState) => {
        props.setEditForm(true);
        props.setLocaleSelected(locale);
        props.setShowForm(true);
    };

    const openDeleteModal = (locale: LocaleState) => {
        props.setLocaleSelected(locale);
        props.openDialog();
    };

    return (
        <Paper className={classes.root}>
            <Toolbar>
                <Typography className={classes.tableTitle} variant="h6" id="tableTitle">
                    Locales
                </Typography>
                <IconButton aria-label="add" onClick={() => loadFormAddLocale()}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </Toolbar>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">KEY</TableCell>
                        <TableCell align="right">FLAG</TableCell>
                        <TableCell align="right">NAME</TableCell>
                        <TableCell align="right">FOR PLAYERS</TableCell>
                        <TableCell align="right">OPTIONS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.locales.map((row: LocaleState) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell align="right">{row.key}</TableCell>
                            <TableCell align="right" className={classes.icon}>{row.icon}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">
                                {row.localeForPlayers ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                            </TableCell>
                            <TableCell align="right">
                                <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                     onClick={() => loadFormEditLocale(row)}>
                                    <EditIcon/>
                                </Fab>
                                <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                     onClick={() => openDeleteModal(row)}>
                                    <DeleteIcon/>
                                </Fab>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default LocalesList;
