import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {TranslationsStore} from "store/types";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import {Paper} from "@material-ui/core";

import {dashboardViewStyles} from "styles/dashboard";
import TranslationsList from "components/views/translations/translationsList";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {
    addTranslation,
    confirmTranslationLanguageById,
    deleteTranslationById,
    editTranslationById,
    getAllTranslations,
} from "services/translations";
import TranslationsForm from "components/views/translations/translationsForm";
import {TranslationState} from "store/translations/types";
import {initialTranslation} from "store/translations/reducers";
import {getAllLanguages} from "services/languages";
import {getAllCategories} from "services/categories";
import {LanguageState} from "store/languages/types";
import DeleteDialog from "components/common/deleteDialog";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const TranslationsView: React.FC<any> = (props: AppProps) => {
    const classes = dashboardViewStyles();

    const [dialog, setOpenDialog] = useState(false);
    const updateDialog = () => {
        setOpenDialog(!dialog);
    };
    const [dataSelected, setDataSelected] = useState<TranslationState>(initialTranslation);
    const [editForm, setEditForm] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        props.getAllTranslationsActions().then((response: any) => {
        });
        props.getAllLanguagesActions();
        props.getAllCategoriesActions().then((response: any) => {
        });
    }, []);

    const onDeleteEntity = () => {
        setOpenDialog(false);
        props.deleteTranslationByIdActions(dataSelected).then((response: any) => {
        })
    };
    const onEditEntity = (data: TranslationState) => {
        props.editTranslationByIdActions(data).then((response: any) => {
        });
        setShowForm(!showForm);
    };
    const onCreateEntity = (data: TranslationState) => {
        props.addTranslationActions(data).then((response: any) => {
        });
        setShowForm(!showForm);
    };

    const onConfirmTranslationLanguage = (data: TranslationState, language: LanguageState) => {
        props.confirmTranslationLanguageByIdActions(data, language).then((response: any) => {
        })
    };

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {!showForm ? (
                            <Grid item xs={12}>
                                <TranslationsList translations={props.translations}
                                                  categories={props.categories}
                                                  tags={props.tags}
                                                  setDataSelected={setDataSelected}
                                                  setEditForm={setEditForm}
                                                  setShowForm={setShowForm}
                                                  openDialog={updateDialog}/>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <TranslationsForm dataSelected={dataSelected} tags={props.tags}
                                                  languages={props.languages}
                                                  categories={props.categories}
                                                  onEditEntity={onEditEntity}
                                                  onCreateEntity={onCreateEntity}
                                                  onConfirmTranslationLanguage={onConfirmTranslationLanguage}
                                                  setEditForm={setEditForm}
                                                  setShowForm={setShowForm}
                                                  editForm={editForm}
                                />
                            </Grid>
                        )}

                        <DeleteDialog
                            openDialog={updateDialog}
                            dialog={dialog}
                            dialogTitle={"Are you sure to delete this Translation?"}
                            deleteItem={dataSelected}
                            deleteFunction={onDeleteEntity}/>
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
};

const mapStateToProps = (store: TranslationsStore) => {
    return {
        translations: store.translations,
        tags: store.tags,
        languages: store.languages,
        categories: store.categories
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getAllLanguagesActions: () => dispatch(getAllLanguages()),
        getAllTranslationsActions: () => dispatch(getAllTranslations()),
        getAllCategoriesActions: () => dispatch(getAllCategories()),
        deleteTranslationByIdActions: (data: TranslationState) => dispatch(deleteTranslationById(data)),
        editTranslationByIdActions: (data: TranslationState) => dispatch(editTranslationById(data)),
        addTranslationActions: (data: TranslationState) => dispatch(addTranslation(data)),
        confirmTranslationLanguageByIdActions: (data: TranslationState, language: LanguageState) =>
            dispatch(confirmTranslationLanguageById(data, language)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TranslationsView);

