import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Button} from "@material-ui/core";

interface PropsDeleteDialog {
    openDialog: () => void,
    dialog: boolean,
    dialogTitle: string
    deleteItem: any,
    deleteFunction: () => void
}

const DeleteDialog: React.FC<any> = (props: PropsDeleteDialog) => {

    return (
        <Dialog
            open={props.dialog}
            onClose={props.openDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Item will be deleted. Are you ok? <br/>
                    ID: {props.deleteItem.id}
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

export default DeleteDialog;

