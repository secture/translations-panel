import React, {useState} from "react";
import {Button, createStyles, Grid, makeStyles, TextField, Theme, Typography, Paper, Container} from "@material-ui/core";
import {CategoryState} from "store/categories/types";
import {dashboardViewStyles} from "styles/dashboard";

const formUserStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    form: {
        width: '100%'
    }
}));

interface PropsDataForm {
    showForm: boolean,
    setShowForm: (show: boolean) => void,
    editForm: boolean,
    dataSelected: CategoryState,
    onEditCategory: (category: CategoryState) => void,
    onAddCategory: (category: CategoryState) => void,
}

const CategoriesForm: React.FC<any> = (props: PropsDataForm) => {
    const classes = formUserStyles();
    const globalStyles = dashboardViewStyles();
    const [category, setCategory] = useState(props.dataSelected);

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
                <Container maxWidth={false} className={globalStyles.container}>
                    <Grid container spacing={2}>
                        <Grid container item direction="row" justify="center" xs={12}>
                            <Typography variant="h6" gutterBottom>
                                {props.editForm ?
                                    'Category Edition whose ID is: ' + props.dataSelected.id :
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
                            <Button className={globalStyles.button}
                                    onClick={() => props.setShowForm(false)}>Back</Button>
                            {props.editForm ? (
                                <Button variant="contained" color="primary"
                                        onClick={() => {
                                            confirmEditCategory()
                                        }}
                                        className={globalStyles.button}> Save </Button>
                            ) : (
                                <Button variant="contained" color="primary"
                                        onClick={() => {
                                            confirmCreateCategory()
                                        }}
                                        className={globalStyles.button}> Create </Button>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Paper>
    )
};

export default CategoriesForm;
