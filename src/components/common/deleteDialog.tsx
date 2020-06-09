import React from "react";

import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from "@material-ui/core";

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

