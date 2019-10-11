import React from "react";
import CssConditional from "clsx";

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import { mainListItems, secondaryListItems } from '../base/ListItems';


const drawerWidth = 240;

const drawerStyles = makeStyles(theme => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    }
}));

const DrawerApp: React.FC<any> = ({open_state, updateOpen }: any) => {
    const classes = drawerStyles();

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: CssConditional(classes.drawerPaper, !open_state && classes.drawerPaperClose),
            }}
            open={open_state}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={updateOpen}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
        </Drawer>
    );
};

export default DrawerApp;
