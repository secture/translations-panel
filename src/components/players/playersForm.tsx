import {formStyles} from '../../styles/form'
import Paper from "@material-ui/core/Paper";
import React from "react";
import Container from "@material-ui/core/Container";
import {Grid, Typography} from "@material-ui/core";

interface PropsLocalesForm {
    playerSelected: any,
    editForm: boolean
}

const PlayersForm: React.FC<any> = (props: PropsLocalesForm) => {

    const classes = formStyles();

    return (
        <Paper className={classes.root}>
            <form className={classes.form}>
                <Container className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid container item direction="row" justify="center" xs={12}>
                            <Typography variant="h6" gutterBottom>
                                {props.editForm ?
                                    'Locale Edition whose ID is: ' + props.playerSelected.id :
                                    'Create a new Locale'
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid container item direction="row" justify="flex-end" xs={12}>
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Paper>
    )
};

export default PlayersForm
