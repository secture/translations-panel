import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

/* Material UI */
import {Grid, Container} from "@material-ui/core";
import {dashboardViewStyles} from "styles/dashboard";

/* Services */
import {
    addTranslation,
    confirmTranslationLanguageById,
    deleteTranslationById,
    editTranslationById,
    getAllTranslations, historyTranslation,
} from "services/translations";
import {getAllLanguages} from "services/languages";
import {getAllCategories} from "services/categories";
import {StatusState} from "store/status/types";
import {setStatus} from "store/status/actions";
import {TranslationState} from "store/translations/types";
import {initialTranslation, initialTranslationHistoryState} from "store/translations/reducers";
import {LanguageState} from "store/languages/types";
import {TranslationsStore} from "store/types";
import {
    TranslationsHistoryColumns,
    TranslationsHistoryRows
} from "components/views/translations/translationsHistoryList";
import FullScreenDialog from "components/common/fullScreenDialog";
import TranslationsForm from "components/views/translations/translationsForm";
import TranslationsList from "components/views/translations/translationsList";
import DeleteDialog from "components/common/deleteDialog";
import SimpleTable from "components/common/simpleTable";


type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const TranslationsView: React.FC<any> = (props: AppProps) => {
    const classes = dashboardViewStyles();

    const [dialog, setOpenDialog] = useState(false);
    const updateDialog = () => {
        setOpenDialog(!dialog);
    };
    const updateForm = () => {
        setShowForm(!showForm);
    };
    const [dataSelected, setDataSelected] = useState<TranslationState>(initialTranslation);
    const [editForm, setEditForm] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [historyTranslation, setHistoryTranslation] = useState(initialTranslationHistoryState);
    const [historyTranslationDialog, setHistoryTranslationDialog] = useState(false);
    const updateHistoryTranslationDialog = () => {
        setHistoryTranslationDialog(!historyTranslationDialog);
    };

    useEffect(() => {
        props.getAllTranslationsActions();
        props.getAllLanguagesActions();
        props.getAllCategoriesActions();
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
        props.confirmTranslationLanguageByIdActions(data, language);
    };

    const getHistoryTranslation = (rowData: any) => {
        props.historyTranslationAction(rowData).then((historyTranslation: any) => {
            if (historyTranslation === null) {
                props.statusAction({
                    type: 'info',
                    message: 'Translation has no history changes',
                    show: true
                })
            } else {
                setHistoryTranslation(historyTranslation);
                updateHistoryTranslationDialog();
            }
        });
    };

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <TranslationsList translations={props.translations}
                                              categories={props.categories}
                                              tags={props.tags}
                                              user={props.user}
                                              setDataSelected={setDataSelected}
                                              getHistoryTranslation={getHistoryTranslation}
                                              setEditForm={setEditForm}
                                              setShowForm={setShowForm}
                                              filters={props.filters}
                                              openDialog={updateDialog}/>
                        </Grid>

                        <FullScreenDialog
                            openDialog={updateForm}
                            dialog={showForm}
                            title={'Editing translation by id:' + dataSelected.id}
                            componentRendered={
                                <TranslationsForm dataSelected={dataSelected} tags={props.tags}
                                                  languages={props.languages}
                                                  categories={props.categories}
                                                  onEditEntity={onEditEntity}
                                                  onCreateEntity={onCreateEntity}
                                                  onConfirmTranslationLanguage={onConfirmTranslationLanguage}
                                                  setEditForm={setEditForm}
                                                  setShowForm={setShowForm}
                                                  editForm={editForm}
                                />}/>
                        <FullScreenDialog
                            title={`History player ${historyTranslation.id}`}
                            openDialog={updateHistoryTranslationDialog}
                            dialog={historyTranslationDialog}
                            componentRendered={<SimpleTable
                                columns={
                                    <TranslationsHistoryColumns
                                        columns={['Key', 'Translations', 'Confirmed', 'Tags', 'Category', 'Context', 'Added', 'Updated']}/>}
                                rows={<TranslationsHistoryRows data={historyTranslation}/>}
                            />}
                        />
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
        translations: store.translations.data,
        user: store.user,
        tags: store.tags,
        languages: store.languages,
        filters: store.filters,
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
        historyTranslationAction: (data: TranslationState) => dispatch(historyTranslation(data)),
        statusAction: (status: StatusState) => dispatch(setStatus(status))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TranslationsView);

