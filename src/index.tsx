import React from 'react';
import ReactDOM from 'react-dom';

/* LAYOUTS */
import FullLayout from './layouts/FullLayout';
import Dashboard from './layouts/DashboardLayout';

/* VIEWS */
import LoginView from './views/loginView';
import DashboardView from './views/dashboardView'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import './index.css';

const layoutAssignments: any = {
    '/': {layout: FullLayout, view: LoginView},
    '/login': {layout: FullLayout, view: LoginView},
    '/dashboard': {layout: Dashboard, view: DashboardView},
};

const layoutPicker = (props: any) => {
    let Layout = layoutAssignments[props.location.pathname].layout;
    let View = layoutAssignments[props.location.pathname].view;
    return Layout ? <Layout view={View}/> : <pre>bad route</pre>;
};

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path="*" render={layoutPicker}/>
            </Router>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));



