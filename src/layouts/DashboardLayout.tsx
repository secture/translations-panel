import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import MenuAppBar from "../components/surfaces/MenuAppBar";
import Drawer from "../components/surfaces/Drawer";

interface DashboardLayoutProps { view: React.ComponentClass }
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
        const View = () => <this.props.view/>;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <MenuAppBar open_state={this.state.open} updateOpen={this.updateOpen}/>
                    <Drawer open_state={this.state.open} updateOpen={this.updateOpen}/>
                    <View/>
                </Grid>
            </Grid>
        );
    }
}

export default DashboardLayout;
