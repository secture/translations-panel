import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {LocaleState} from "../../store/locale/types";
import {Button, Fab, FormControl, Grid, Input, InputLabel, TextField, Typography} from "@material-ui/core";

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

const LocalesList: React.FC<any> = ({locales}: any) => {
    const classes = localesListStyles();
    const [showTable, setShowTable] = useState(true);
    const [dataSelected, setDataSelected] = useState({id: '', key: '', name: ''});

    const editClick = (data: LocaleState) => {
        setDataSelected(data);
        setShowTable(!showTable);
    };

    const deleteClick = (data: LocaleState) => {
        setDataSelected(data);
        setShowTable(!showTable);
    };

    return (
        <div>
            <Paper className={`${classes.root} ${!showTable ? classes.show : classes.hide}`}>
                <form className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid container direction="row" justify="center" xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>
                                Editing Locale by ID is: {dataSelected.id}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="key"
                                name="key"
                                label="Key"
                                fullWidth
                                autoComplete="fname"
                                value={dataSelected.key}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                fullWidth
                                autoComplete="fname"
                                value={dataSelected.name}
                            />
                        </Grid>
                        <Grid container direction="row" justify="flex-end" xs={12} sm={12}>
                            <Button className={classes.button} onClick={e => setShowTable(!showTable)}>Return</Button>
                            <Button variant="contained" color="primary" className={classes.button}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            <Paper className={`${classes.root} ${showTable ? classes.show : classes.hide}`}>
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
                                         onClick={e => editClick(row)}>
                                        <EditIcon/>
                                    </Fab>
                                    <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                         onClick={e => deleteClick(row)}>
                                        <DeleteIcon/>
                                    </Fab>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

export default LocalesList;
