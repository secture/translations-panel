import React from "react";

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Dialog, AppBar, Toolbar, IconButton, Typography, Slide} from '@material-ui/core';
import {TransitionProps} from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';

const fullScreenDialogStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        spacingChips: {
            margin: '0 15px',
        }
    }),
);

/*const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});*/

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction="up"/>;
}

interface PropsFullScreenDialog {
    title: string,
    componentRendered: any,
    openDialog: () => void,
    dialog: boolean
}

const FullScreenDialog: React.FC<any> = (props: PropsFullScreenDialog) => {
    const classes = fullScreenDialogStyles();

    return (
        <div>
            <Dialog fullScreen open={props.dialog} onClose={props.openDialog}
                    TransitionComponent={SlideTransition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="secondary" onClick={props.openDialog} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {props.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                {props.componentRendered}
            </Dialog>
        </div>
    )
};

export default FullScreenDialog;
