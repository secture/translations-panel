import React from 'react';
import ReactDOM from 'react-dom';
import LoginLayout from './layouts/LoginLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './index.css';

const layoutAssignments: any = {
    '/': LoginLayout,
    '/login': LoginLayout,
    '/dashboard': DashboardLayout,
};

const layoutPicker = (props: any) => {
    let Layout = layoutAssignments[props.location.pathname];
    return Layout ? <Layout/> : <pre>bad route</pre>;
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



