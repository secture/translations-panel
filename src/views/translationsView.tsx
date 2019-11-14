import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {TranslationsStore} from "../store/types";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper} from "@material-ui/core";

import {dashboardViewStyles} from "../styles/dashboard";
import TranslationsList from "../components/translations/translationsList";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {
    addTranslation,
    confirmTranslationLocaleById,
    deleteTranslationById,
    editTranslationById,
    getAllTranslations, searchTranslations
} from "../services/translations";
import TranslationsForm from "../components/translations/translationsForm";
import {TranslationState} from "../store/translations/types";
import {initialTranslation} from "../store/translations/reducers";
import {getAllLocales} from "../services/locale";
import {getAllCategories} from "../services/categories";
import {LocaleState} from "../store/locales/types";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const TranslationsView: React.FC<any> = (props: AppProps) => {
    const classes = dashboardViewStyles();

    const [dataSelected, setDataSelected] = useState<TranslationState>(initialTranslation);
    const [actionType, setActionType] = useState<string>('create');
    const [showComponent, setShowComponent] = useState(true);
    const [statusModal, setStatusModal] = useState(false);

    const changeStatusModal = (status: boolean) => {
        setStatusModal(status);
    };

    const onSelectedData = (data: TranslationState) => {
        setDataSelected(data);
        setShowComponent(!showComponent);
    };

    const onActionType = (type: string) => {
        setActionType(type);
        if (type === 'create') {
            setDataSelected(initialTranslation);
        }
        setShowComponent(!showComponent);
    };

    const onCancel = () => {
        setDataSelected(initialTranslation);
        setShowComponent(!showComponent);
    };

    const onCreateEntity = (data: TranslationState) => {
        props.addTranslationActions(data).then((response: any) => {
        });
        setShowComponent(!showComponent);
    };

    const onEditEntity = (data: TranslationState) => {
        props.editTranslationByIdActions(data).then((response: any) => {
        });
        setShowComponent(!showComponent);
    };
    const openDialog = (data: TranslationState) => {
        setDataSelected(data);
        setStatusModal(true);
    };

    const onDeleteEntity = (data: TranslationState) => {
        setStatusModal(false);
        props.deleteTranslationByIdActions(data).then((response: any) => {
        })
    };

    const onConfirmTranslationLocale = (data: TranslationState, locale: LocaleState) => {
        props.confirmTranslationLocaleByIdActions(data, locale).then((response: any) => {
        })
    };
    const onSearchTranslation = (search: string) => {
        props.searchTranslationsActions(search).then((response: any) => {
        })
    };

    useEffect(() => {
        props.getAllTranslationsActions().then((response: any) => {
        });
        props.getAllLocalesActions();
        props.getAllCategoriesActions().then((response: any) => {
        });
    }, []);

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {!showComponent ? (
                            <Paper className={`${classes.content}`}>
                                <TranslationsForm dataSelected={dataSelected} tags={props.tags} locales={props.locales}
                                                  categories={props.categories} actionType={actionType}
                                                  onCancel={onCancel} onEditEntity={onEditEntity}
                                                  onCreateEntity={onCreateEntity}
                                                  onConfirmTranslationLocale={onConfirmTranslationLocale}/>
                            </Paper>) : (
                            <Paper className={`${classes.content}`}>
                                <TranslationsList data={props.translations} onSelectedData={onSelectedData}
                                                  onActionType={onActionType} openDialog={openDialog}
                                                  onSearchTranslation={onSearchTranslation}/>
                            </Paper>)}
                        <Dialog
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            open={statusModal}>
                            <DialogTitle id="alert-dialog-title">{"Are you sure to delete this locale?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    ID: {dataSelected.id}
                                    <br/>
                                    Key: {dataSelected.key}
                                    <br/>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={e => changeStatusModal(false)} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={e => onDeleteEntity(dataSelected)} color="primary" autoFocus>
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
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
        locales: store.locales,
        categories: store.categories
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getAllLocalesActions: () => dispatch(getAllLocales()),
        getAllTranslationsActions: () => dispatch(getAllTranslations()),
        getAllCategoriesActions: () => dispatch(getAllCategories()),
        deleteTranslationByIdActions: (data: TranslationState) => dispatch(deleteTranslationById(data)),
        editTranslationByIdActions: (data: TranslationState) => dispatch(editTranslationById(data)),
        addTranslationActions: (data: TranslationState) => dispatch(addTranslation(data)),
        searchTranslationsActions: (search: string) => dispatch(searchTranslations(search)),
        confirmTranslationLocaleByIdActions: (data: TranslationState, locale: LocaleState) =>
            dispatch(confirmTranslationLocaleById(data, locale)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TranslationsView);

