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
import {createUser, deleteUser, getUsers, updateUser} from "services/user";
import {initialUserState} from "store/user/reducers";
import {UserState} from "../store/user/types";
import {getAllLanguages} from "../services/languages";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const UsersView = (props: AppProps) => {
    const [userSelected, setUserSelected] = useState(initialUserState);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [dialog, setOpenDialog] = useState(false);
    const updateDialog = () => {
        setOpenDialog(!dialog);
    };

    const classes = dashboardViewStyles();

    useEffect(() => {
        props.getAllLanguagesAction();
        props.getUsersAction();
    }, []);

    const onEditUser = (user: UserState) => {
        props.editUserAction(user).then((user: UserState) => {
            (user !== null) ? alert('User editado') : alert('no ha sido posible editar el User')
        })
    };
    const onAddUser= (user: UserState) => {
        props.addUserAction(user).then((user: UserState) => {
            (user !== null) ? alert('User creado') : alert('no ha sido posible crear el User')
        })
    };

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
                            <UsersList users={props.users}
                                       user={props.user}
                                       setUserSelected={setUserSelected}
                                       showForm={showForm}
                                       setShowForm={setShowForm}
                                       setEditForm={setEditForm}
                                       openDialog={updateDialog}/>
                        </Grid>) : (
                        <Grid item xs={12}>
                            <UsersForm user={props.user}
                                       userSelected={userSelected}
                                       languages={props.languages}
                                       roles={props.roles}
                                       editForm={editForm}
                                       showForm={showForm}
                                       onAddUser={onAddUser}
                                       onEditUser={onEditUser}
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
        user: store.user,
        languages: store.languages,
        roles: store.roles
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getUsersAction: () => dispatch(getUsers()),
        getAllLanguagesAction: () => dispatch(getAllLanguages()),
        addUserAction: (user: UserState) => dispatch(createUser(user)),
        editUserAction: (user: UserState) => dispatch(updateUser(user)),
        deleteUserAction: (id: string) => dispatch(deleteUser(id))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UsersView);

