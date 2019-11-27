import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {TranslationsStore} from "store/types";
import {initialLanguage} from "store/languages/reducers";
import {LanguageState} from "store/languages/types";

/* Services */
import {addLanguage, deleteLanguageById, editLanguageById, getAllLanguages} from "services/languages";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import {dashboardViewStyles} from "styles/dashboard";

/* Components */
import LanguagesList from "components/views/languages/languagesList";
import DeleteDialog from "components/common/deleteDialog";
import LanguagesForm from "components/views/languages/languagesForm";
import FullScreenDialog from "../components/common/fullScreenDialog";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const LanguageView: React.FC<any> = (props: AppProps) => {

    const [dataSelected, setDataSelected] = useState(initialLanguage);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [dialog, setOpenDialog] = useState(false);
    const updateDialog = () => {
        setOpenDialog(!dialog);
    };
    const updateForm = () => {
        setShowForm(!showForm);
    };

    useEffect(() => {
        props.getAllLanguageActions();
    }, []);

    const onDeleteLanguage = () => {
        props.deleteLanguageByIdActions(dataSelected);
        setOpenDialog(false);
    };
    const onEditLanguage = (language: LanguageState) => {
        props.editLanguageByIdActions(language);
    };
    const onAddLanguage = (language: LanguageState) => {
        props.addLanguageActions(language);
    };

    const classes = dashboardViewStyles();
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <LanguagesList languages={props.languages}
                                       setLanguageSelected={setDataSelected}
                                       showForm={showForm}
                                       setShowForm={setShowForm}
                                       openDialog={updateDialog}
                                       setEditForm={setEditForm}/>
                    </Grid>
                    <FullScreenDialog
                        openDialog={updateForm}
                        dialog={showForm}
                        title={'Editing Language by id:' + dataSelected.id}
                        componentRendered={<LanguagesForm onEditLanguage={onEditLanguage}
                                                          onAddLanguage={onAddLanguage}
                                                          languageSelected={dataSelected}
                                                          showForm={showForm}
                                                          setShowForm={setShowForm}
                                                          editForm={editForm}/>}/>
                    <DeleteDialog openDialog={updateDialog}
                                  dialog={dialog}
                                  dialogTitle={"Are you sure to delete this Language?"}
                                  deleteItem={dataSelected}
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
