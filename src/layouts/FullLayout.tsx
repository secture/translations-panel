import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import StatusNotification from "../components/common/statusNotification";

interface FullLayoutProps {
    view: React.ComponentClass
}

interface FullLayoutState {
}

class FullLayout extends Component <FullLayoutProps, FullLayoutState> {

    render() {
        const View = () => <this.props.view/>;
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <View/>
                    <StatusNotification/>
                </Grid>
            </Grid>
        );
    }
}

export default FullLayout;
