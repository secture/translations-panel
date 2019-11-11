import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const tableStyles = makeStyles((theme: Theme) => createStyles({
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
    color: {
        backgroundColor: theme.palette.grey.A100
    },
    actions: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

export const enhancedTableStyles = makeStyles((theme: Theme) => createStyles({
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
}));
