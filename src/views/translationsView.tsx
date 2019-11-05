import React, {useEffect, useState} from 'react';
import {connect, useSelector} from 'react-redux'
import {TranslationsStore} from "../store/types";
import {UserState} from "../store/user/types";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper} from "@material-ui/core";

import {dashboardViewStyles} from "../styles/dashboard";
import TranslationsList from "../components/translations/translationsList";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {addTranslation, deleteTranslationById, editTranslationById, getAllTranslations} from "../services/translations";
import TranslationsForm from "../components/translations/translationsForm";
import {TranslationState} from "../store/translations/types";
import {initialTranslation} from "../store/translations/reducers";
import {LocaleState} from "../store/locale/types";
import {addLocale, deleteLocaleById, editLocaleById} from "../services/locale";

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
        setShowComponent(!showComponent);
    };

    const onCancel = () => {
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
    const onModalAction = (data: TranslationState) => {
        setDataSelected(data);
        setStatusModal(true);
    };

    const onDeleteEntity = (data: TranslationState) => {
        setStatusModal(false);
        props.deleteTranslationByIdActions(data).then((response: any) => {
        })
    };

    useEffect(() => {
        props.getAllTranslationsActions().then((response: any) => {
        });
    }, []);

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={`${classes.content} ${!showComponent ? classes.show : classes.hide}`}>
                            <TranslationsForm dataSelecteds={dataSelected} tags={props.tags} actionType={actionType}
                                              onCancel={onCancel} onEditEntity={onEditEntity}
                                              onCreateEntity={onCreateEntity}/>
                        </Paper>
                        <Paper className={`${classes.content} ${showComponent ? classes.show : classes.hide}`}>
                            <TranslationsList translations={props.translations} onSelectedData={onSelectedData}
                                              onActionType={onActionType} onModalAction={onModalAction}/>
                        </Paper>

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
        tags: store.tags
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getAllTranslationsActions: () => dispatch(getAllTranslations()),
        deleteTranslationByIdActions: (data: TranslationState) => dispatch(deleteTranslationById(data)),
        editTranslationByIdActions: (data: TranslationState) => dispatch(editTranslationById(data)),
        addTranslationActions: (data: TranslationState) => dispatch(addTranslation(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TranslationsView);

