import React, {SyntheticEvent, useEffect, useState} from "react";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import {StatusState} from "store/status/types";
import {setStatus} from "store/status/actions";
import {initialStatus} from "store/status/reducers";
import {TranslationsStore} from "store/types";

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import {IconButton, makeStyles, Slide, Snackbar, SnackbarContent, Theme} from "@material-ui/core";
import {amber, green} from "@material-ui/core/colors";
import {TransitionProps} from "@material-ui/core/transitions";
import clsx from 'clsx';

const variantIcon: any = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

function SlideTransition(props: TransitionProps) {
    return <Slide {...props} direction="up"/>;
}

const snackbarsStyle: any = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const StatusNotification: React.FC<any> = (props: AppProps) => {
    const classes = snackbarsStyle();
    const Icon = variantIcon[props.status.type];
    const [open, setOpen] = useState(props.status.show);
    const handleClose = () => {
        setOpen(false);
        props.setStatusActions({
            type: props.status.type,
            message: '',
            show: false
        });
    };

    useEffect(() => {
        setOpen(props.status.show);
    });

    return (<Snackbar
        open={open}
        autoHideDuration={3000}
        TransitionComponent={SlideTransition}
        onClose={handleClose}>
        <SnackbarContent
            className={clsx(classes[props.status.type])}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}> <Icon
                    className={clsx(classes.icon, classes.iconVariant)}/>
                    {props.status.message}</span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="secondary" onClick={handleClose}>
                    <CloseIcon className={classes.icon}/>
                </IconButton>,
            ]}
        />
    </Snackbar>);
};
const mapStateToProps = (store: TranslationsStore) => {
    return {
        status: store.status
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        setStatusActions: (data: StatusState) => dispatch(setStatus(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatusNotification);


