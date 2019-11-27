import React, {useState} from 'react';
import {
    Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Switch, TextField,
    Typography, InputLabel, Select, MenuItem
} from "@material-ui/core";

import AppleIcon from '@material-ui/icons/Apple';
import AndroidIcon from '@material-ui/icons/Android';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';

import {TranslationState} from "store/translations/types";
import {LanguageState} from "store/languages/types";
import {CategoryState} from "store/categories/types";

import {formStyles} from "styles/form";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

export const GetPlatformIcon = (props: { tag: any, classes: any }) => {
    switch (props.tag.toLowerCase()) {
        case 'ios':
            return (<AppleIcon className={props.classes.tag}/>);
        case 'android':
            return (<AndroidIcon className={props.classes.tag}/>);
        case 'web':
            return (<LaptopMacIcon className={props.classes.tag}/>);
        default:
            return (<span/>);
    }
};

function prop<T, K extends keyof T>(obj: T, key: K, defaultValue: any) {
    if (typeof obj[key] === "undefined") {
        return defaultValue;
    } else {
        return obj[key];
    }
}

interface PropsDataForm {
    dataSelected: TranslationState,
    tags: Array<string>,
    languages: LanguageState[],
    categories: CategoryState[],
    actionType: String,
    onCancel: () => void,
    onEditEntity: (translation: TranslationState) => void,
    onCreateEntity: (translation: TranslationState) => void,
    onConfirmTranslationLanguage: (translation: TranslationState, language: LanguageState) => void,
    editForm: boolean,
    showForm: boolean,
    setShowForm: (show: boolean) => void
}

const TranslationsForm: React.FC<any> = (props: PropsDataForm) => {
    const classes = formStyles();
    const [data, setData] = useState<TranslationState>(props.dataSelected);
    const changedValues = (e: any, property: string) => {
        setData({
            ...data,
            [property]: e.target.value
        });
    };
    const changeItemValues = (e: any, property: keyof TranslationState, item: string) => {
        setData({
            ...data as TranslationState,
            [property]: {
                ...data[property] as TranslationState,
                [item]: e.target.value
            }
        });
    };

    const changeConfirmLanguageValue = (e: any, property: keyof TranslationState, language: LanguageState) => {
        setData({
            ...data as TranslationState,
            [property]: {
                ...data[property] as TranslationState,
                [language.key]: e.target.value.toLowerCase() !== "true"
            }
        });
        props.onConfirmTranslationLanguage(data, language);
    };
    const changeValuesOfArray = (e: any, property: keyof TranslationState, key: string) => {
        let values = (data[property] as Array<string>);
        if (values.some((stag: string) => stag === key)) {
            let index = values.indexOf(key, 0);
            if (index > -1) {
                values.splice(index, 1);
            }
        } else {
            values.push(key);
        }
        setData({
            ...data,
            [property]: values
        });
    };

    const confirmEditData = () => {
        props.setShowForm(false);
        props.onEditEntity(data);
    };

    const confirmCreateData = () => {
        props.setShowForm(false);
        props.onCreateEntity(data);
    };

    return (
        <Paper className={classes.root}>
            <form className={classes.form}>
                <Container maxWidth={false} className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid container item direction="row" justify="center" xs={12} sm={12}>
                            <Typography variant="h6" gutterBottom>
                                {props.editForm ?
                                    'Translation id: ' + data.id :
                                    'Create a new Language'
                                }
                            </Typography>
                            <Divider variant="middle"/>
                            {props.editForm &&
                            <Typography variant="overline" display="block" gutterBottom>
                                Last updated by: {data.updateUser.name}({data.updateUser.privilege})
                            </Typography>
                            }
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <TextField
                                id={'key_' + data.id}
                                label={'key'}
                                fullWidth
                                value={data.key}
                                onChange={(e) => changedValues(e, 'key')}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <FormControl className={classes.root}>
                                <InputLabel shrink id="select_category">
                                    Category
                                </InputLabel>
                                <Select key={'select_category'}
                                        id="select_category"
                                        value={data.category !== null ? data.category.id : ''}
                                        onChange={(e) => changeItemValues(e, 'category', 'id')}
                                        fullWidth>
                                    {props.categories.map((catItem: CategoryState) => (
                                        <MenuItem key={'select_category' + catItem.id}
                                                  value={catItem.id}>{catItem.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                id="context"
                                label="context"
                                fullWidth
                                autoComplete="fcontext"
                                onChange={(e) => changedValues(e, 'context')}
                                value={data.context}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            {props.tags.map((tagItem: any) => {
                                return <FormControl key={tagItem} component="fieldset">
                                    <FormLabel component="legend">
                                        <GetPlatformIcon tag={tagItem} classes={classes}/>
                                    </FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox
                                                key={tagItem}
                                                checked={data.tags.some((stag: any) => stag === tagItem)}
                                                onChange={(e) => changeValuesOfArray(e, 'tags', tagItem)}/>}
                                            label=""
                                        />
                                    </FormGroup>
                                </FormControl>
                            })}
                        </Grid>
                        {props.languages.map((language: LanguageState) => (
                            <Grid item xs={12} sm={6} key={'translation_' + language.key}>
                                <TextField
                                    id={'translation_' + language.key}
                                    label={language.key.toUpperCase()}
                                    multiline
                                    rows="4"
                                    variant="filled"
                                    fullWidth
                                    defaultValue={prop((data.translations as any), language.key, null)}
                                    onChange={(e) => changeItemValues(e, 'translations', language.key)}
                                />

                                {props.editForm ? (
                                    <FormGroup row>
                                        <FormControlLabel
                                            key={'switch_' + language.key}
                                            disabled={prop((data.confirmedTranslations as any), language.key, false)}
                                            control={
                                                <Switch
                                                    name={'switch_' + language.key}
                                                    checked={prop((data.confirmedTranslations as any), language.key, false)}
                                                    onChange={(e) => changeConfirmLanguageValue(e, 'confirmedTranslations', language)}
                                                    value={prop((data.confirmedTranslations as any), language.key, false)}
                                                    color="primary"
                                                />
                                            }
                                            label="Confirmed"
                                        />
                                    </FormGroup>
                                ) : (<span/>)}
                            </Grid>))}
                        <Grid container item direction="row" justify="flex-end" xs={12} sm={12}>
                            <Button className={classes.button}
                                    onClick={() => props.setShowForm(false)}>Return</Button>
                            {props.editForm ? (
                                <Button variant="contained" color="primary"
                                        onClick={e => confirmEditData()}
                                        className={classes.button}> Save </Button>
                            ) : (
                                <Button variant="contained" color="primary"
                                        onClick={e => confirmCreateData()}
                                        className={classes.button}> Create </Button>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </Paper>
    );
};

export default TranslationsForm;
