import React, {ReactElement} from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {PlayerState} from "../../store/players/types";

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
    items: ReactElement[],
    data: any,
    openDialog: () => void,
    dialog: boolean
}

const nodeList = (player: PlayerState) => {
    const marginRightChip = {marginRight: '10px'};
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Chip style={marginRightChip} label={player.id} />
            <Chip style={marginRightChip} label={player.shortName['es']} />
            <Chip style={marginRightChip} label={player.shortName['he']} />
            <Chip style={marginRightChip} label={player.largeName['es']} />
            <Chip style={marginRightChip} label={player.largeName['he']} />
            {player.team !== ' ' && <Chip style={marginRightChip} label={player.team} />}
            {player.comments !== ' ' && <Chip style={marginRightChip} label={player.comments} />}
        </div>
    )
};

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
                            History player {props.data.id}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    {props.data.history.map((player: PlayerState) => (
                        <ListItem button>
                            <ListItemText primary={nodeList(player)} secondary={new Date(player.updateDate).toDateString()} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </div>
    )
};

export default FullScreenDialog;
