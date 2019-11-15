import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {TranslationsStore} from "../store/types";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';

import {dashboardViewStyles} from "../styles/dashboard";
import LanguagesList from "components/views/languages/languagesList";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {addLanguage, deleteLanguageById, editLanguageById, getAllLanguages} from "services/languages";
import {LanguageState} from "store/languages/types";
import DeleteDialog from "components/common/deleteDialog";
import LanguagesForm from "components/views/languages/languagesForm";
import {initialLanguage} from "store/languages/reducers";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const LanguageView: React.FC<any> = (props: AppProps) => {

    const [languageSelected, setLanguageSelected] = useState(initialLanguage);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [dialog, setOpenDialog] = useState(false);
    const updateDialog = () => {
        setOpenDialog(!dialog);
    };

    useEffect(() => {
        props.getAllLanguageActions();
    }, []);

    const onDeleteLanguage = () => {
        props.deleteLanguageByIdActions(languageSelected).then((language: LanguageState) => {
            (language !== null) ? alert('Language deleted') : alert('no ha sido posible eliminar el language')
        });
        setOpenDialog(false);
    };
    const onEditLanguage = (language: LanguageState) => {
        props.editLanguageByIdActions(language).then((language: LanguageState) => {
            (language !== null) ? alert('Language editado') : alert('no ha sido posible editar el language')
        })
    };
    const onAddLanguage = (language: LanguageState) => {
        props.addLanguageActions(language).then((language: LanguageState) => {
            (language !== null) ? alert('Language creado') : alert('no ha sido posible crear el language')
        })
    };

    const classes = dashboardViewStyles();
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={3}>
                    {!showForm ? (
                        <Grid item xs={12}>
                            <LanguagesList languages={props.languages}
                                         setLanguageSelected={setLanguageSelected}
                                         showForm={showForm}
                                         setShowForm={setShowForm}
                                         openDialog={updateDialog}
                                         setEditForm={setEditForm}/>
                        </Grid>) : (
                        <Grid item xs={12}>
                            <LanguagesForm onEditLanguage={onEditLanguage}
                                         onAddLanguage={onAddLanguage}
                                         languageSelected={languageSelected}
                                         showForm={showForm}
                                         setShowForm={setShowForm}
                                         editForm={editForm}/>
                        </Grid>)}
                    <DeleteDialog openDialog={updateDialog}
                                  dialog={dialog}
                                  dialogTitle={"Are you sure to delete this Language?"}
                                  deleteItem={languageSelected}
                                  deleteFunction={onDeleteLanguage}/>
                </Grid>
            </Container>
        </main>
    )
};

const mapStateToProps = (store: TranslationsStore) => {
    return {
        languages: store.languages
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getAllLanguageActions: () => dispatch(getAllLanguages()),
        deleteLanguageByIdActions: (data: LanguageState) => dispatch(deleteLanguageById(data)),
        editLanguageByIdActions: (data: LanguageState) => dispatch(editLanguageById(data)),
        addLanguageActions: (data: LanguageState) => dispatch(addLanguage(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LanguageView);
