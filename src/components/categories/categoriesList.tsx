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

import {CategoryState} from "../../store/categories/types";
import {
    Fab,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import {initialCategory} from "../../store/categories/reducers";

const categoriesListStyles = makeStyles((theme: Theme) =>
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
        form: {
            padding: '24px',
            margin: '48px inherit 48px inherit',
            minWidth: 650,
        },
        button: {
            margin: theme.spacing(1),
        },
        icon: {
            fontSize: '28px',
        },
        show: {
            display: 'show',
        },
        hide: {
            display: 'none',
        }
    })
);

interface PropsCategoriesList {
    categories: CategoryState[],
    setCategorySelected: (category: CategoryState) => void,
    showForm: boolean,
    setShowForm: (show: boolean) => void,
    openDialog: () => void,
    setEditForm: (isEditForm: boolean) => void
}

const CategoriesList: React.FC<any> = (props: PropsCategoriesList) => {
    const classes = categoriesListStyles();

    const loadFormAddCategory = () => {
        props.setEditForm(false);
        props.setCategorySelected(initialCategory);
        props.setShowForm(true);
    };

    const loadFormEditCategory = (category: CategoryState) => {
        props.setEditForm(true);
        props.setCategorySelected(category);
        props.setShowForm(true);
    };

    const openDeleteModal = (category: CategoryState) => {
        props.setCategorySelected(category);
        props.openDialog();
    };

    return (
        <Paper className={classes.root}>
            <Toolbar>
                <Typography className={classes.tableTitle} variant="h6" id="tableTitle">
                    Categories
                </Typography>
                <IconButton aria-label="add" onClick={() => loadFormAddCategory()}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </Toolbar>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="right">NAME</TableCell>
                        <TableCell align="right">OPTIONS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.categories.map((row: CategoryState) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">
                                <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                     onClick={() => loadFormEditCategory(row)}>
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

export default CategoriesList;
