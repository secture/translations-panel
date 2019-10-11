import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

interface FullLayoutProps { view: Component }
interface FullLayoutState { }

class FullLayout extends Component <FullLayoutProps, FullLayoutState> {
    render(){

        const View = () => <FullLayoutProps.view />;

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <View/>
                </Grid>
            </Grid>
        );
    }
}

export default FullLayout;
