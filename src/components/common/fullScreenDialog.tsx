import React, {ReactElement} from "react";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

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

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
            <Dialog fullScreen open={props.dialog} onClose={props.openDialog} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.openDialog} aria-label="close">
                            <CloseIcon />
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
