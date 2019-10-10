import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import MenuAppBar from "../components/surfaces/MenuAppBar";
import Drawer from "../components/surfaces/Drawer";

class DashboardLayout extends Component {
    render(){
        return (
            <Grid container>
                <Grid item xs={12}>
                    <MenuAppBar/>
                    <Drawer/>
                </Grid>
            </Grid>
        );
    }
}

export default  DashboardLayout;
