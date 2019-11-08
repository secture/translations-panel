import React, {useState} from "react";
import {Button, createStyles, Grid, makeStyles, Switch, TextField, Theme, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {CategoryState} from "../../store/categories/types";
import Container from "@material-ui/core/Container";

const formUserStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    form: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

interface PropsCategoriesForm {
    showForm: boolean,
    setShowForm: (show: boolean) => void,
    editForm: boolean,
    categorySelected: CategoryState,
    onEditCategory: (category: CategoryState) => void,
    onAddCategory: (category: CategoryState) => void,
}

const CategoriesForm: React.FC<any> = (props: PropsCategoriesForm) => {
    const classes = formUserStyles();
    const [category, setCategory] = useState(props.categorySelected);

    const changedValues = (e: any, property: string) => {
        setCategory({
            ...category,
            [property]: e.target.value
        });
    };

    const confirmEditCategory = () => {
        props.setShowForm(false);
        props.onEditCategory(category);
    };

    const confirmCreateCategory = () => {
        props.setShowForm(false);
        props.onAddCategory(category);
    };

    return (
        <Paper className={classes.root}>
            <form className={classes.form}>
                <Container className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid container item direction="row" justify="center" xs={12}>
                            <Typography variant="h6" gutterBottom>
                                {props.editForm ?
                                    'Category Edition whose ID is: ' + props.categorySelected.id :
                                    'Create a new Category'
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                fullWidth
                                onChange={(e) => changedValues(e, 'name')}
                                autoComplete="fname"
                                value={category.name}
                            />
                        </Grid>
                        <Grid container item direction="row" justify="flex-end" xs={12}>
                            <Button className={classes.button} onClick={() => props.setShowForm(false)}>Back</Button>
                            {props.editForm ? (
                                <Button variant="contained" color="primary"
                                        onClick={() => {
                                            confirmEditCategory()
                                        }}
                                        className={classes.button}> Save </Button>
                            ) : (
                                <Button variant="contained" color="primary"
                                        onClick={() => {
                                            confirmCreateCategory()
                                        }}
                                        className={classes.button}> Create </Button>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Paper>
    )
};

export default CategoriesForm;
