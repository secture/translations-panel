import React from "react";
import {TranslationsStore} from "../../store/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const DeleteDialog: React.FC<any> = (props: AppProps) => {

    return (
        <Dialog
            open={props.dialog}
            onClose={props.openDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Are you sure to delete this locale?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Item will be deleted. Are you ok?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.openDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.deleteFunction} color="primary" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (store: TranslationsStore, props: any) => {
    return {
        openDialog: props.openDialog,
        dialog: props.dialog,
        deleteItem: props.deleteItem,
        deleteFunction: props.deleteFunction
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>, props: any) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeleteDialog);

