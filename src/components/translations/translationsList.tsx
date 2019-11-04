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
import AppleIcon from '@material-ui/icons/Apple';
import AndroidIcon from '@material-ui/icons/Android';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import FilterListIcon from '@material-ui/icons/FilterList';
import {
    Button, Checkbox, Divider,
    Fab, FormControl, FormControlLabel, FormGroup, FormLabel,
    Grid,
    IconButton, Switch,
    TablePagination,
    TableSortLabel,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import {TranslationState} from "../../store/translations/types";
import {initialTranslation} from "../../store/translations/reducers";

const translationsListStyles = makeStyles((theme: Theme) =>
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
        tableWrapper: {
            overflowX: 'auto',
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        tag: {
            fontSize: '18px',
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

function desc<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

type Order = 'asc' | 'desc';

function getSorting<K extends keyof any>(
    order: Order,
    orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

interface headCell {
    disablePadding: boolean;
    id: keyof TranslationState;
    label: string;
    numeric: boolean;
}

const headCells: headCell[] = [
    {id: 'key', numeric: false, disablePadding: false, label: 'Key'},
    {id: 'category', numeric: false, disablePadding: false, label: 'Category'},
    {id: 'tags', numeric: false, disablePadding: false, label: 'Tags'},
    {id: 'confirmed', numeric: false, disablePadding: false, label: 'Confirmed'},
    {id: 'updateDate', numeric: false, disablePadding: false, label: 'UDate'},
];

interface EnhancedTableProps {
    classes: ReturnType<typeof translationsListStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TranslationState) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {classes, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property: keyof TranslationState) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell>
                    OPTIONS
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

function GetPlatformIcon(props: { tag: any, classes: any }) {
    switch (props.tag.toLowerCase()) {
        case 'ios':
            return (<AppleIcon className={props.classes.tag}/>);
        case 'android':
            return (<AndroidIcon className={props.classes.tag}/>);
        case 'web':
            return (<LaptopMacIcon className={props.classes.tag}/>);
        default:
            return (<span/>);
    }
}

function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

const TranslationsList: React.FC<any> = ({translations, tags, onDeleteTranslation, onEditTranslation, onAddTranslation}: any) => {
    const classes = translationsListStyles();
    const [showTable, setShowTable] = useState(true);
    const [editAction, editActionTable] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [dataSelected, setDataSelected] = useState<TranslationState>(initialTranslation);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof TranslationState>('updateDate');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const goBack = () => {
        setDataSelected(initialTranslation);
        editActionTable(false);
        setShowTable(!showTable);
    };
    const showEditForm = (data: TranslationState) => {
        setDataSelected(data);
        editActionTable(true);
        setShowTable(!showTable);
    };
    const confirmEditLocale = (data: TranslationState) => {
        setShowTable(!showTable);
        onEditTranslation(data);
    };
    const changedValues = (e: any, property: string) => {
        setDataSelected({
            ...dataSelected,
            [property]: e.target.value
        });
    };
    const changeValuesBoolean = (e: any, property: string) => {
        setDataSelected({
            ...dataSelected,
            [property]: e.target.value.toLowerCase() !== "true"
        });
    };
    const changeValuesOfArray = (e: any, property: keyof TranslationState, key: string) => {
        let data = (dataSelected[property] as any);
        if (data.some((stag: string) => stag === key)) {
            let index = data.indexOf(key, 0);
            if (index > -1) {
                data.splice(index, 1);
            }
        } else {
            data.push(key);
        }
        setDataSelected({
            ...dataSelected,
            [property]: data
        });
    };
    const openDeleteModal = (data: TranslationState) => {
        setDataSelected(data);
        setOpenModal(!openModal);
    };
    const closeModal = () => {
        setOpenModal(!openModal);
    };
    const confirmDeleteLocale = (data: TranslationState) => {
        setOpenModal(!openModal);
        onDeleteTranslation(data);
    };
    const addClick = () => {
        setDataSelected(initialTranslation);
        editActionTable(false);
        setShowTable(!showTable);
    };
    const confirmCreateLocale = (data: TranslationState) => {
        setShowTable(!showTable);
        onAddTranslation(data);
    };

    /*****************/

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TranslationState) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };


    return (
        <div>
            <Paper className={`${classes.root} ${!showTable ? classes.show : classes.hide}`}>
                <form className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid container item direction="row" justify="center" xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>
                                {editAction ?
                                    'Translation id: ' + dataSelected.id :
                                    'Create a new Locale'
                                }
                            </Typography>
                            <Divider variant="middle"/>
                            <Typography variant="overline" display="block" gutterBottom>
                                Last updated by: {dataSelected.updateUser.name}({dataSelected.updateUser.privilege})
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="key"
                                name="key"
                                label="Key"
                                fullWidth
                                autoComplete="fkey"
                                onChange={(e) => changedValues(e, 'key')}
                                value={dataSelected.key}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="category"
                                name="category"
                                label="category"
                                fullWidth
                                autoComplete="fcategory"
                                onChange={(e) => changedValues(e, 'category')}
                                value={dataSelected.category !== null ? dataSelected.category.name : ''}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="context"
                                name="context"
                                label="context"
                                fullWidth
                                autoComplete="fcontext"
                                onChange={(e) => changedValues(e, 'context')}
                                value={dataSelected.context}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Confirmed</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <Switch
                                        checked={dataSelected.confirmed}
                                        onChange={(e) => changeValuesBoolean(e, 'confirmed')}
                                        value={dataSelected.confirmed}
                                        color="primary"
                                        inputProps={{'aria-label': 'Confirmed'}}
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            {tags.map((tag: any) => {
                                return <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        <GetPlatformIcon tag={tag} classes={classes}/>
                                    </FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={dataSelected.tags.some(stag => stag === tag)}
                                                onChange={(e) => changeValuesOfArray(e, 'tags', tag)}/>}
                                            label=""
                                        />
                                    </FormGroup>
                                </FormControl>
                            })}
                        </Grid>

                        {Object.keys(dataSelected.translations).map((key: string) => (
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id={'translation_' + key}
                                    label={key.toUpperCase()}
                                    multiline
                                    rows="4"
                                    variant="filled"
                                    fullWidth
                                    defaultValue={prop((dataSelected.translations as any), key)}
                                    onChange={(e) => changedValues(e, 'translations.' + key)}
                                />
                            </Grid>
                        ))}

                        <Grid container item direction="row" justify="flex-end" xs={12} sm={12}>
                            <Button className={classes.button}
                                    onClick={e => goBack()}>Return</Button>
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
                        Translations
                    </Typography>
                    <IconButton aria-label="add" onClick={e => addClick()}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                    <IconButton aria-label="filter list">
                        <FilterListIcon/>
                    </IconButton>
                </Toolbar>
                <Table className={classes.table} aria-label="simple table">
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={translations.length}
                    />
                    <TableBody>
                        {stableSort(translations, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any, index: any) => {
                                return (<TableRow key={row.id}>
                                        <TableCell>{row.key}</TableCell>
                                        <TableCell>
                                            {row.category !== null ? row.category.name : ''}
                                        </TableCell>
                                        <TableCell>
                                            {row.tags.map((tag: any) => (
                                                <GetPlatformIcon tag={tag} classes={classes}/>
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            {row.confirmed ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(row.updateDate.toString()).toLocaleString()}</TableCell>
                                        <TableCell>
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
                                );
                            })}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={translations.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
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

export default TranslationsList;
