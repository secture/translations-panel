import {makeStyles, Theme} from "@material-ui/core";
import {deepOrange} from '@material-ui/core/colors';

export const dashboardViewStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    /***** CONTENT *****/
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    itemGrid: {
      margin: '1em',
    },
    appBarSpacer: theme.mixins.toolbar,
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    /***** AVATAR *****/
    avatar: {
        backgroundColor: theme.palette.grey.A100
    },
    avatarLanguage: {
        backgroundColor: theme.palette.primary.main
    },
    /***** STATUS *****/
    show: {
        display: 'show',
    },
    hide: {
        display: 'none',
    },
    /***** FORMS *****/
    formControl: {
        margin: theme.spacing(3),
    },
    /***** ACTIONS *****/
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        margin: theme.spacing(1),
    },
}));
