import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
    Fab, IconButton, TablePagination, TableSortLabel, Toolbar, Typography, TableRow, TableHead, TableCell,
    TableBody, Table, InputBase
} from "@material-ui/core";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppleIcon from '@material-ui/icons/Apple';
import AndroidIcon from '@material-ui/icons/Android';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import SearchIcon from '@material-ui/icons/Search';

import {TranslationState} from "../../store/translations/types";
import {OrderTableType, TableUtils} from "../../services/utils/table";
import {CategoryState} from "../../store/categories/types";
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
        input: {
            width: '20%'
        }
    })
);

const tableUtils = new TableUtils();

const headCells: headCell[] = [
    {id: 'key', numeric: false, disablePadding: false, label: 'Key'},
    {id: 'category', numeric: false, disablePadding: false, label: 'Category'},
    {id: 'translations', numeric: false, disablePadding: false, label: 'Translate'},
    {id: 'tags', numeric: false, disablePadding: false, label: 'Tags'},
    {id: 'updateDate', numeric: false, disablePadding: false, label: 'UDate'},
];

interface headCell {
    disablePadding: boolean;
    id: keyof TranslationState;
    label: string;
    numeric: boolean;
}

interface EnhancedTableProps {
    classes: ReturnType<typeof translationsListStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TranslationState) => void;
    order: OrderTableType,
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

interface PropsDataList {
    data: TranslationState[],
    onSelectedData: (data: TranslationState) => void,
    onActionType: (data: string) => void,
    openDialog: (data: TranslationState) => void,
    onSearchTranslation: (data: string) => void,
}

const TranslationsList: React.FC<any> = (props: PropsDataList) => {
    const classes = translationsListStyles();

    const [order, setOrder] = React.useState<OrderTableType>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof TranslationState>('updateDate');
    const [selected, setSelected] = React.useState<TranslationState[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const editData = (data: TranslationState) => {
        props.onSelectedData(data);
        props.onActionType('edit');
    };

    const deleteData = (data: TranslationState) => {
        props.openDialog(data);
    };

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

    function searchTranslations(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        if (e.target.value.length >= 2) {
            props.onSearchTranslation(e.target.value);
        }
    }

    return (
        <div>
            <Toolbar>
                <Typography className={classes.tableTitle} variant="h6" id="tableTitle">
                    Translations
                </Typography>
                <SearchIcon/>
                <InputBase
                    className={classes.input}
                    placeholder="Search Translations"
                    inputProps={{'aria-label': 'search translations'}}
                    onChange={e => searchTranslations(e)}
                />
                <IconButton aria-label="add" onClick={e => props.onActionType('create')}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </Toolbar>
            <Table className={classes.table} aria-label="simple table">
                <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={props.data.length}
                />
                <TableBody>
                    {tableUtils.stableSort(props.data as TranslationState[], tableUtils.getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row: TranslationState) => {
                            return (<TableRow key={row.id}>
                                    <TableCell>{row.key}</TableCell>
                                    <TableCell>
                                        {row.category !== null ? row.category.name : ''}
                                    </TableCell>
                                    <TableCell>
                                        {row.translations.es !== null ? row.translations.es : ''}
                                    </TableCell>
                                    <TableCell>
                                        {row.tags.map((tag: any) => (
                                            <GetPlatformIcon key={tag} tag={tag} classes={classes}/>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(row.updateDate.toString()).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                             onClick={e => editData(row)}>
                                            <EditIcon/>
                                        </Fab>
                                        <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                             onClick={e => deleteData(row)}>
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
                count={props.data.length}
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
        </div>
    );
};

export default TranslationsList;
