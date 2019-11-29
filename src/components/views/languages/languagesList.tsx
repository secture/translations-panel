import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import PermissionsProvider from "components/common/permissionsProvider";

import {LanguageState} from "store/languages/types";
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
                        <PermissionsProvider child={<TableCell>Options</TableCell>}
                                             privileges={allowedRoles}/>
                        <TableCell>ID</TableCell>
                        <TableCell>Key</TableCell>
                        <TableCell>Flag</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>For players</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.languages.map((row: LanguageState) => (
                        <TableRow key={row.id}>
                            <PermissionsProvider child={<TableCell>
                                <IconButton color="primary" aria-label="edit" className={classes.fab}
                                            onClick={() => loadFormEditLanguage(row)}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton color="secondary" aria-label="edit" className={classes.fab}
                                            onClick={() => openDeleteModal(row)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>} privileges={allowedRoles}/>
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell>{row.key}</TableCell>
                            <TableCell className={classes.icon}>{row.icon}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                                {row.localeForPlayers ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default LanguagesList;
