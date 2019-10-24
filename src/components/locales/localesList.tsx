import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {LocaleState} from "../../store/locale/types";

import './localesList.css';
import {Simulate} from "react-dom/test-utils";

const localesListStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    show: {
        display: 'show',
    },
    hide: {
        display: 'none',
    }
});

const LocalesList: React.FC<any> = ({locales}: any) => {
    const classes = localesListStyles();
    const [showTable, setShowTable] = useState(true);

    const deleteClick = (data: LocaleState) => {
        console.log('deleteClick');
        setShowTable(!showTable);
    };

    const editClick = (data: LocaleState) => {
        console.log('editClick');
        setShowTable(!showTable);
    };

    return (
        <div>
            <button onClick={e => setShowTable(!showTable)} className={ `${showTable ? classes.show : classes.hide}`}>volver</button>
            <Paper className={`${classes.root} ${showTable ? classes.show : classes.hide}` }>
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
                                    <EditIcon onClick={e => editClick(row)}></EditIcon>
                                    <DeleteIcon onClick={e => deleteClick(row)}></DeleteIcon>
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
