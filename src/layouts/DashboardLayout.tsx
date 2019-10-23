import React, {useState} from 'react';
import MenuAppBar from "../components/surfaces/MenuAppBar";
import Drawer from "../components/surfaces/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {getUser} from "../services/user";
import {connect} from "react-redux";
import {TranslationsStore} from "../store/types";

interface DashboardLayoutProps {
    view: React.ComponentClass,
}
//interface DashboardLayoutState { open: boolean }

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps & DashboardLayoutProps;

const dashboardLayoutStyles = makeStyles({
    root: {
        display: 'flex',
    }
});

const DashboardLayout = (props: AppProps) => {
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

const mapStateToProps = (store: TranslationsStore) => {
    return {
        auth: store.auth
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getUserAction: () => dispatch(getUser()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DashboardLayout);
