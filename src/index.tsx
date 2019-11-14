import React from 'react';
import ReactDOM from 'react-dom';

/* LAYOUTS */
import FullLayout from './layouts/FullLayout';
import Dashboard from './layouts/DashboardLayout';

/* VIEWS */
import LoginView from './views/loginView';
import DashboardView from './views/dashboardView'
import TranslationsView from './views/translationsView'
import ExportsView from "./views/exportsView";
import LocalesView from "./views/localesView";
import UsersView from "./views/usersView";
import PlayersView from "./views/playersView";
import CategoriesView from "./views/categoriesView";

/* STORE */
import store from './store'
import {saveState} from './store/localStorage';

/* ROUTES */
import {Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import history from './history';

import './index.css';

const layoutAssignments: any = {
    '/': {layout: FullLayout, view: LoginView},
    '/login': {layout: FullLayout, view: LoginView},
    '/dashboard': {layout: Dashboard, view: DashboardView},
    '/dashboard/translations': {layout: Dashboard, view: TranslationsView},
    '/dashboard/categories': {layout: Dashboard, view: CategoriesView},
    '/dashboard/exports': {layout: Dashboard, view: ExportsView},
    '/dashboard/locales': {layout: Dashboard, view: LocalesView},
    '/dashboard/users': {layout: Dashboard, view: UsersView},
    '/dashboard/players': {layout: Dashboard, view: PlayersView}
};

class App extends React.Component {

    layoutPicker(props: any) {
        if (!store.getState().auth.isAuthenticated && (props.location.pathname !== '/login')) {
            history.push('/login');
        }
        const Layout = (typeof layoutAssignments[props.location.pathname] !== 'undefined') ? layoutAssignments[props.location.pathname].layout : null;
        const View = (typeof layoutAssignments[props.location.pathname] !== 'undefined') ? layoutAssignments[props.location.pathname].view : null;
        return (Layout && View) ? <Layout view={View}/> : <pre>bad route</pre>;
    }

    render() {
        return (
            <Router history={history}>
                <Route path="*" render={this.layoutPicker}/>
            </Router>
        );
    }
}

store.subscribe(() => {
    saveState({
        auth: store.getState().auth,
        locales: store.getState().locales,
        user: store.getState().user,
        users: store.getState().users,
        players: store.getState().players,
        translations: store.getState().translations,
        categories: store.getState().categories,
        tags: store.getState().tags,
    });
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);



