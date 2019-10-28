import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import {LocaleState} from "../../store/locale/types";
import {
    Button,
    Fab,
    Grid, IconButton,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";

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
        form: {
            padding: '24px',
            margin: '48px inherit 48px inherit',
            minWidth: 650,
        },
        button: {
            margin: theme.spacing(1),
        },
        show: {
            display: 'show',
        },
        hide: {
            display: 'none',
        }
    })
);

const LocalesList: React.FC<any> = ({locales, onDeleteLocale, onEditLocale, onAddLocale}: any) => {
    const classes = localesListStyles();
    const [showTable, setShowTable] = useState(true);
    const [editAction, editActionTable] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [dataSelected, setDataSelected] = useState({id: '', key: '', name: ''});

    const showEditForm = (data: LocaleState) => {
        setDataSelected(data);
        editActionTable(true);
        setShowTable(!showTable);
    };
    const confirmEditLocale = (data: LocaleState) => {
        setShowTable(!showTable);
        onEditLocale(data);
    };
    const changedValues = (e: any, property: string) => {
        setDataSelected({
            ...dataSelected,
            [property]: e.target.value
        });
    };

    const openDeleteModal = (data: LocaleState) => {
        setDataSelected(data);
        setOpenModal(!openModal);
    };
    const closeModal = () => {
        setOpenModal(!openModal);
    };
    const confirmDeleteLocale = (data: LocaleState) => {
        setOpenModal(!openModal);
        onDeleteLocale(data);
    };

    const addClick = () => {
        setDataSelected({id: '', key: '', name: ''});
        editActionTable(false);
        setShowTable(!showTable);
    };
    const confirmCreateLocale = (data: LocaleState) => {
        setShowTable(!showTable);
        onAddLocale(data);
    };


    return (
        <div>
            <Paper className={`${classes.root} ${!showTable ? classes.show : classes.hide}`}>
                <form className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid container item direction="row" justify="center" xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>
                                {editAction ?
                                    'Locale Edition whose ID is: ' + dataSelected.id :
                                    'Create a new Locale'
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="key"
                                name="key"
                                label="Key"
                                fullWidth
                                autoComplete="fname"
                                onChange={(e) => changedValues(e, 'key')}
                                value={dataSelected.key}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                fullWidth
                                onChange={(e) => changedValues(e, 'name')}
                                autoComplete="fname"
                                value={dataSelected.name}
                            />
                        </Grid>
                        <Grid container item direction="row" justify="flex-end" xs={12} sm={12}>
                            <Button className={classes.button} onClick={e => setShowTable(!showTable)}>Return</Button>
                            {editAction ? (
                                <Button variant="contained" color="primary"
                                        onClick={e => confirmEditLocale(dataSelected)}
                                        className={classes.button}> Save </Button>
                            ) : (
                                <Button variant="contained" color="primary"
                                        onClick={e => confirmCreateLocale(dataSelected)}
                                        className={classes.button}> Create </Button>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            <Paper className={`${classes.root} ${showTable ? classes.show : classes.hide}`}>
                <Toolbar>
                    <Typography className={classes.tableTitle} variant="h6" id="tableTitle">
                        Locales
                    </Typography>
                    <IconButton aria-label="add" onClick={e => addClick()}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </Toolbar>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">KEY</TableCell>
                            <TableCell align="right">NAME</TableCell>
                            <TableCell align="right">OPTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {locales.map((row: any) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="right">{row.key}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">
                                    <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                         onClick={e => showEditForm(row)}>
                                        <EditIcon/>
                                    </Fab>
                                    <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                         onClick={e => openDeleteModal(row)}>
                                        <DeleteIcon/>
                                    </Fab>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Dialog
                    open={openModal}
                    onClose={closeModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure to delete this locale?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ID: {dataSelected.id}
                            <br/>
                            Key: {dataSelected.key}
                            <br/>
                            Name: {dataSelected.name}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={e => confirmDeleteLocale(dataSelected)} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </div>
    );
};

export default LocalesList;
