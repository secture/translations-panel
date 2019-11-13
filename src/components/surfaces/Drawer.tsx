import React from "react";
import CssConditional from "clsx";

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
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
            width: '100%'
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
                            <ShoppingCartIcon/>
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
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Export translations"/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        history.push('/dashboard/locales')
                    }}>
                        <ListItemIcon>
                            <BarChartIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Locale"/>
                    </ListItem>
                    <ListItem button onClick={() => {
                        history.push('/dashboard/users')
                    }}>
                        <ListItemIcon>
                            <LayersIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Users"/>
                    </ListItem>
                </div>
            </List>
            <Divider/>
            <List>
                <div>
                    <ListSubheader inset>Saved reports</ListSubheader>
                    <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Current month"/>
                    </ListItem>
                </div>
            </List>
        </Drawer>
    );
};

export default DrawerApp;
