import React from 'react';
import ReactDOM from 'react-dom';
import FullLayout from './layouts/FullLayout';
import Dashboard from './layouts/DashboardLayout';
import LoginView from './views/loginView';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './index.css';

const layoutAssignments: any = {
    '/': FullLayout,
    '/login': FullLayout,
    '/dashboard': Dashboard
};

const layoutPicker = (props: any) => {
    let Layout = layoutAssignments[props.location.pathname];
    let View = layoutAssignments[props.location.pathname];
    return Layout ? <Layout view={LoginView}/> : <pre>bad route</pre>;
};

class App extends React.Component {
    render(){
        return (
            <Router>
                <Route path="*" render={layoutPicker}/>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));



