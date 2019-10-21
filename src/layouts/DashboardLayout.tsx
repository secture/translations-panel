import React, {useState} from 'react';
import MenuAppBar from "../components/surfaces/MenuAppBar";
import Drawer from "../components/surfaces/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface DashboardLayoutProps { view: React.ComponentClass }
//interface DashboardLayoutState { open: boolean }

const dashboardLayoutStyles = makeStyles({
    root: {
        display: 'flex',
    }
});

const DashboardLayout = (props: DashboardLayoutProps) => {
    const [open, setOpen] = useState(true);
    const updateOpen = () => {
        setOpen(!open);
    };

    const classes = dashboardLayoutStyles();
    const View = () => <props.view/>;

    return (
        <div className={classes.root}>
            <MenuAppBar open_state={open} updateOpen={updateOpen}/>
            <Drawer open_state={open} updateOpen={updateOpen}/>
            <View/>
        </div>
    )
};

export default DashboardLayout;
