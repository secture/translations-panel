import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {TranslationsStore} from "store/types";
import {initialCategory} from "store/categories/reducers";
import {CategoryState} from "store/categories/types";

/* Services */
import {addCategory, deleteCategoryById, editCategoryById, getAllCategories} from "services/categories";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import {dashboardViewStyles} from "styles/dashboard";

/* Components */
import CategoriesList from "components/views/categories/categoriesList";
import DeleteDialog from "components/common/deleteDialog";
import CategoriesForm from "components/views/categories/categoriesForm";
import FullScreenDialog from "../components/common/fullScreenDialog";
import LanguagesForm from "../components/views/languages/languagesForm";

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const CategoriesView: React.FC<any> = (props: AppProps) => {
    const [dataSelected, setDataSelected] = useState(initialCategory);
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
        props.getAllCategoriesActions();
    }, []);

    const onDeleteCategory = () => {
        props.deleteCategoryByIdActions(dataSelected);
        setOpenDialog(false);
    };
    const onEditCategory = (language: CategoryState) => {
        props.editCategoryByIdActions(language);
    };
    const onAddCategory = (language: CategoryState) => {
        props.addCategoryActions(language);
    };

    const classes = dashboardViewStyles();
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CategoriesList data={props.categories}
                                        setDataSelected={setDataSelected}
                                        showForm={showForm}
                                        setShowForm={setShowForm}
                                        openDialog={updateDialog}
                                        setEditForm={setEditForm}/>
                    </Grid>)
                    <FullScreenDialog
                        openDialog={updateForm}
                        dialog={showForm}
                        title={'Editing Category by id:' + dataSelected.id}
                        componentRendered={<CategoriesForm onEditCategory={onEditCategory}
                                                           onAddCategory={onAddCategory}
                                                           dataSelected={dataSelected}
                                                           showForm={showForm}
                                                           setShowForm={setShowForm}
                                                           editForm={editForm}/>}/>
                    <DeleteDialog openDialog={updateDialog}
                                  dialog={dialog}
                                  dialogTitle={"Are you sure to delete this Category?"}
                                  deleteItem={dataSelected}
                                  deleteFunction={onDeleteCategory}/>
                </Grid>
            </Container>
        </main>
    )
};

const mapStateToProps = (store: TranslationsStore) => {
    return {
        categories: store.categories
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getAllCategoriesActions: () => dispatch(getAllCategories()),
        deleteCategoryByIdActions: (data: CategoryState) => dispatch(deleteCategoryById(data)),
        editCategoryByIdActions: (data: CategoryState) => dispatch(editCategoryById(data)),
        addCategoryActions: (data: CategoryState) => dispatch(addCategory(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CategoriesView);
