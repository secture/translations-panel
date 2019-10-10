import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";

class LoginLayout extends Component {
    render(){
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h2>Login</h2>
                    <Button variant="contained" color="primary">
                        Hola Mundo!
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default LoginLayout;
