import React from "react";
import Paper from "@material-ui/core/Paper";
import {enhancedTableStyles} from '../../styles/table'
import {Fab, IconButton, InputBase, TablePagination, TableSortLabel, Toolbar, Typography} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import {PlayerState} from "../../store/players/types";
import {UsersState} from "../../store/users/types";
import {initialPlayerState} from "../../store/players/reducers";
import {OrderTableType, TableUtils} from "../../services/utils/table";

const tableUtils = new TableUtils();

interface headCell {
    id: keyof PlayerState;
    numeric: boolean;
    disablePadding: boolean;
    label: string;
}

const headCells: headCell[] = [
    {id: 'playerMasterId', numeric: false, disablePadding: false, label: 'Id'},
    {id: 'shortName', numeric: false, disablePadding: false, label: 'Short name'},
    {id: 'largeName', numeric: false, disablePadding: false, label: 'Large name'},
    {id: 'team', numeric: false, disablePadding: false, label: 'Team'},
    {id: 'comments', numeric: false, disablePadding: false, label: 'Comments'},
    {id: 'insertionDate', numeric: false, disablePadding: false, label: 'IDate'},
    {id: 'updateDate', numeric: false, disablePadding: false, label: 'UDate'},
    {id: 'insertionUser', numeric: false, disablePadding: false, label: 'IUser'},
    {id: 'updateUser', numeric: false, disablePadding: false, label: 'IDate'},
    {id: 'confirmedTranslations', numeric: false, disablePadding: false, label: 'Confirmed'},
];

interface EnhancedTableProps {
    classes: ReturnType<any>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof PlayerState) => void;
    order: OrderTableType,
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {classes, order, orderBy, onRequestSort} = props;
    const createSortHandler = (property: keyof PlayerState) => (event: React.MouseEvent<unknown>) => {
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
                        sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}>
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

///////////////

interface PropsPlayersList {
    players: any,
    user: UsersState,
    setPlayerSelected: (player: PlayerState) => void,
    setEditForm: (isEditForm: boolean) => void,
    setShowForm: (show: boolean) => void,
    openDialog: () => void,
    onSearchPlayer: (search: string) => void
}

const PlayersList: React.FC<any> = (props: PropsPlayersList) => {
    const classes = enhancedTableStyles();

    const [selected, setSelected] = React.useState<string[]>([]);
    const [order, setOrder] = React.useState<OrderTableType>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof PlayerState>('updateDate');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const loadFormAddPlayer = () => {
        console.log(initialPlayerState);
    };

    const loadFormEditPlayer = (player: PlayerState) => {
        console.log(player)
    };

    const openDeleteModal = (player: PlayerState) => {
        console.log(player)
    };

    const searchTranslations = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.target.value.length >= 2) {
            props.onSearchPlayer(e.target.value);
        }
    };

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof PlayerState) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <Toolbar>
                <Typography className={classes.tableTitle} variant="h6" id="tableTitle">
                    Players
                </Typography>
                <SearchIcon/>
                <InputBase
                    className={classes.input}
                    placeholder="Search Translations"
                    inputProps={{'aria-label': 'search translations'}}
                    onChange={e => searchTranslations(e)}
                />
                <IconButton aria-label="add" onClick={() => loadFormAddPlayer()}>
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
                    rowCount={props.players.length}
                />
                <TableBody>
                    {tableUtils.stableSort(props.players, tableUtils.getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row: any, index: any) => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.playerMasterId}</TableCell>
                                    <TableCell align="right">
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            {
                                                Object.keys(row.shortName).map((key: any) => (
                                                    <Chip
                                                        style={{marginBottom: "5px"}}
                                                        avatar={<Avatar>{key}</Avatar>}
                                                        label={row.shortName[key]}
                                                        color="primary"
                                                    />
                                                ))}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">{
                                        Object.keys(row.largeName).map((key: any) => (
                                            <Chip
                                                avatar={<Avatar>{key}</Avatar>}
                                                label={row.largeName[key]}
                                                color="primary"
                                            />
                                        ))}
                                    </TableCell>
                                    <TableCell align="right">{row.team}</TableCell>
                                    <TableCell align="right">{row.comments}</TableCell>
                                    <TableCell align="right">{row.insertionDate}</TableCell>
                                    <TableCell align="right">{row.updateDate}</TableCell>
                                    <TableCell align="right">{row.insertionUser.name}</TableCell>
                                    <TableCell align="right">{row.updateUser.name}</TableCell>
                                    <TableCell align="right">{
                                        Object.keys(row.confirmedTranslations).map((key: any) => (
                                            <Chip
                                                avatar={<Avatar>{key}</Avatar>}
                                                label={row.confirmedTranslations[key]}
                                                color="primary"
                                            />
                                        ))}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                             onClick={() => loadFormEditPlayer(row)}>
                                            <EditIcon/>
                                        </Fab>
                                        <Fab size="small" color="primary" aria-label="edit" className={classes.fab}
                                             onClick={() => openDeleteModal(row)}>
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
                count={props.players.length}
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
        </Paper>
    )
};

export default PlayersList;
