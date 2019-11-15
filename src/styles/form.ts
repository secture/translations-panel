import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const formStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    form: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));
