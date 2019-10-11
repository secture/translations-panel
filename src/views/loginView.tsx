import React, {Component} from 'react';
import {Button} from "@material-ui/core";

class LoginView extends Component {
    render() {
        return (
            <div>
                <h2>Login</h2>
                <Button variant="contained" color="primary">
                    Hola Mundo!
                </Button>
            </div>
        );
    }
}

export default LoginView;
