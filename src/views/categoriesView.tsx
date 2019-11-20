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

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const CategoriesView: React.FC<any> = (props: AppProps) => {
    const [categorySelected, setCategorySelected] = useState(initialCategory);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [dialog, setOpenDialog] = useState(false);
    const updateDialog = () => {
        setOpenDialog(!dialog);
    };

    useEffect(() => {
        props.getAllCategoriesActions().then(r => {
        });
    }, []);

    const onDeleteCategory = () => {
        props.deleteCategoryByIdActions(categorySelected).then((language: CategoryState) => {
            (language !== null) ? alert('Category eliminaro') : alert('no ha sido posible eliminar el language')
        });
        setOpenDialog(false);
    };
    const onEditCategory = (language: CategoryState) => {
        props.editCategoryByIdActions(language).then((language: CategoryState) => {
            (language !== null) ? alert('Category editado') : alert('no ha sido posible editar el language')
        })
    };
    const onAddCategory = (language: CategoryState) => {
        props.addCategoryActions(language).then((language: CategoryState) => {
            (language !== null) ? alert('Category creado') : alert('no ha sido posible crear el language')
        })
    };

    const classes = dashboardViewStyles();
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={3}>
                    {!showForm ? (
                        <Grid item xs={12}>
                            <CategoriesList data={props.categories}
                                            setDataSelected={setCategorySelected}
                                            showForm={showForm}
                                            setShowForm={setShowForm}
                                            openDialog={updateDialog}
                                            setEditForm={setEditForm}/>
                        </Grid>) : (
                        <Grid item xs={12}>
                            <CategoriesForm onEditCategory={onEditCategory}
                                            onAddCategory={onAddCategory}
                                            dataSelected={categorySelected}
                                            showForm={showForm}
                                            setShowForm={setShowForm}
                                            editForm={editForm}/>
                        </Grid>)}
                    <DeleteDialog openDialog={updateDialog}
                                  dialog={dialog}
                                  dialogTitle={"Are you sure to delete this Category?"}
                                  deleteItem={categorySelected}
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
