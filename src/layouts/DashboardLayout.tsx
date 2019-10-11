import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import MenuAppBar from "../components/surfaces/MenuAppBar";
import Drawer from "../components/surfaces/Drawer";

interface DashboardLayoutProps { /* Declare your components props here */ }
interface DashboardLayoutState { open: boolean }

class DashboardLayout extends Component<DashboardLayoutProps, DashboardLayoutState> {

    constructor(props: any) {
        super(props);
        this.state = {
            open: true,
        };
    };

    updateOpen = () => {
        this.setState(state => ({
            open: !state.open
        }));
    };

    render(){
        return (
            <Grid container>
                <Grid item xs={12}>
                    <MenuAppBar open_state={this.state.open} updateOpen={this.updateOpen}/>
                    <Drawer open_state={this.state.open} updateOpen={this.updateOpen}/>
                </Grid>
            </Grid>
        );
    }
}

export default DashboardLayout;
