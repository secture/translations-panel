import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {TranslationsStore} from "store/types";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';

import {dashboardViewStyles} from "styles/dashboard";
import UsersList from "components/views/users/usersList";
import UsersForm from "components/views/users/usersForm";
import DeleteDialog from "components/common/deleteDialog";

import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {deleteUser, getUsers} from "services/user";
import {initialUserState} from "store/user/reducers";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const UsersView = (props: AppProps) => {
    const [dialog, setOpenDialog] = useState(false);
    const updateDialog = () => {
        setOpenDialog(!dialog);
    };

    const [userSelected, setUserSelected] = useState(initialUserState);
    const [showForm, setShowForm] = useState(false);
    const [typeForm, setTypeForm] = useState('create');

    const classes = dashboardViewStyles();

    useEffect(() => {
        props.getUsersAction();
    }, []);

    const deleteUser = () => {
        props.deleteUserAction(userSelected.id).then((deleteOk: boolean) => {
            (deleteOk) ? alert('User eliminado') : alert('no ha sido posible elimar el User')
        });
        updateDialog();
    };

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={3}>
                    {!showForm ? (
                        <Grid item xs={12}>
                            <UsersList users={props.users} user={props.user}
                                       setUserSelected={setUserSelected}
                                       showForm={showForm}
                                       setShowForm={setShowForm}
                                       setTypeForm={setTypeForm}
                                       openDialog={updateDialog}/>
                        </Grid>) : (
                        <Grid item xs={12}>
                            <UsersForm user={userSelected} typeForm={typeForm} showForm={showForm}
                                       setShowForm={setShowForm}/>
                        </Grid>)
                    }
                    <DeleteDialog
                        openDialog={updateDialog}
                        dialog={dialog}
                        dialogTitle={"Are you sure to delete this User?"}
                        deleteItem={userSelected}
                        deleteFunction={deleteUser}/>
                </Grid>
            </Container>
        </main>
    )
};

const mapStateToProps = (store: TranslationsStore) => {
    return {
        users: store.users,
        user: store.user
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getUsersAction: () => dispatch(getUsers()),
        deleteUserAction: (id: string) => dispatch(deleteUser(id))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UsersView);

