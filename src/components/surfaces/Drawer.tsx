import React from "react";
import CssConditional from "clsx";

import {Drawer, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {makeStyles} from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import GetAppIcon from '@material-ui/icons/GetApp';
import LanguageIcon from '@material-ui/icons/Language';
import PeopleIcon from '@material-ui/icons/People';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import ClassIcon from '@material-ui/icons/Class';

import history from "../../history";

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
        '& img': {
            width: '80%'
        }
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

const DrawerApp: React.FC<any> = ({open_state, updateOpen}: any) => {
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
                <img src="/logo.png" alt=""/>
                <IconButton onClick={updateOpen}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <List>
                <div>
                    <ListItem button onClick={() => {
                        history.push('/dashboard')
                    }}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        history.push('/dashboard/translations')
                    }}>
                        <ListItemIcon>
                            <FontDownloadIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Translations"/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        history.push('/dashboard/categories')
                    }}>
                        <ListItemIcon>
                            <ClassIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Categories"/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        history.push('/dashboard/exports')
                    }}>
                        <ListItemIcon>
                            <GetAppIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Export translations"/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        history.push('/dashboard/languages')
                    }}>
                        <ListItemIcon>
                            <LanguageIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Language"/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        history.push('/dashboard/players')
                    }}>
                        <ListItemIcon>
                            <SportsSoccerIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Players"/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        history.push('/dashboard/users')
                    }}>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Users"/>
                    </ListItem>
                </div>
            </List>
        </Drawer>
    );
};

export default DrawerApp;
