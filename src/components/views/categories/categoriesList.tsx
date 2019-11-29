import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
    Paper, Table, TableBody, TableCell, TableHead, TableRow, Fab, IconButton, Toolbar, Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PermissionsProvider from "components/common/permissionsProvider";
import {allowedRoles} from "store";
import {CategoryState} from "store/categories/types";
import {initialCategory} from "store/categories/reducers";

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
    })
);

interface PropsDataList {
    data: CategoryState[],
    setDataSelected: (category: CategoryState) => void,
    showForm: boolean,
    setShowForm: (show: boolean) => void,
    openDialog: () => void,
    setEditForm: (isEditForm: boolean) => void
}

const CategoriesList: React.FC<any> = (props: PropsDataList) => {
    const classes = categoriesListStyles();
    const loadFormAddData = () => {
        props.setEditForm(false);
        props.setDataSelected(initialCategory);
        props.setShowForm(true);
    };

    const loadFormEditData = (data: CategoryState) => {
        props.setEditForm(true);
        props.setDataSelected(data);
        props.setShowForm(true);
    };

    const openDeleteModal = (data: CategoryState) => {
        props.setDataSelected(data);
        props.openDialog();
    };

    return (
        <Paper className={classes.root}>
            <Toolbar>
                <Typography className={classes.tableTitle} variant="h6" id="tableTitle">
                    Categories
                </Typography>
                <PermissionsProvider child={<IconButton aria-label="add" color="primary" onClick={() => loadFormAddData()}>
                    <AddCircleOutlineIcon/>
                </IconButton>} privileges={['Admin']}/>
            </Toolbar>

            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <PermissionsProvider child={<TableCell>Options</TableCell>}
                                             privileges={allowedRoles}/>
                        <TableCell>Id </TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row: CategoryState) => (
                        <TableRow key={row.id}>
                            <PermissionsProvider child={<TableCell>
                                <IconButton color="primary" aria-label="edit" className={classes.fab}
                                            onClick={() => loadFormEditData(row)}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton color="secondary" aria-label="edit" className={classes.fab}
                                            onClick={() => openDeleteModal(row)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>} privileges={allowedRoles}/>
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default CategoriesList;
