import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';

import {dashboardViewStyles} from "styles/dashboard";
import TranslationsList from "components/views/translations/translationsList";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {TranslationState} from "store/translations/types";
import {initialTranslation, initialTranslationHistoryState} from "store/translations/reducers";
import {LanguageState} from "store/languages/types";
import {TranslationsStore} from "store/types";

/* Services */
import {
    addTranslation,
    confirmTranslationLanguageById,
    deleteTranslationById,
    editTranslationById,
    getAllTranslations, historyTranslation,
} from "services/translations";
import TranslationsForm from "components/views/translations/translationsForm";
import {getAllLanguages} from "services/languages";
import {getAllCategories} from "services/categories";
import DeleteDialog from "components/common/deleteDialog";
import {StatusState} from "store/status/types";
import {setStatus} from "store/status/actions";
import SimpleTable from "components/common/simpleTable";
import FullScreenDialog from "components/common/fullScreenDialog";
import {
    TranslationsHistoryColumns,
    TranslationsHistoryRows
} from "../components/views/translations/translationsHistoryList";

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

    const getHistoryTranslation= (rowData: any) => {
        props.historyTranslationAction(rowData).then((historyTranslation: any) => {
            if (historyTranslation === null) {
                props.statusAction({type: 'info',
                    message: 'Translation has no history changes',
                    show: true})
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
                        {!showForm ? (
                            <Grid item xs={12}>
                                <TranslationsList translations={props.translations}
                                                  categories={props.categories}
                                                  tags={props.tags}
                                                  user={props.user}
                                                  setDataSelected={setDataSelected}
                                                  getHistoryTranslation={getHistoryTranslation}
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
                        <FullScreenDialog
                            title={`History player ${historyTranslation.id}`}
                            openDialog={updateHistoryTranslationDialog}
                            dialog={historyTranslationDialog}
                            componentRendered={<SimpleTable
                                columns={<TranslationsHistoryColumns columns={['ID', 'Category', 'Confirmed', 'Context', 'Insertion date', 'Key', 'Tags', 'Translations', 'Updated']}/>}
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
        translations: store.translations,
        user: store.user,
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
        historyTranslationAction: (data: TranslationState) => dispatch(historyTranslation(data)),
        statusAction: (status: StatusState) => dispatch(setStatus(status))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TranslationsView);

