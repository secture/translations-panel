import React, {useEffect, useReducer, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
    Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Switch, TextField,
    Typography, Paper
} from "@material-ui/core";

import AppleIcon from '@material-ui/icons/Apple';
import AndroidIcon from '@material-ui/icons/Android';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';

import {initialTranslation, initialTranslationState} from "../../store/translations/reducers";
import {TranslationState} from "../../store/translations/types";
import {LocaleState} from "../../store/locales/types";

const translationsFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            overflowX: 'auto',
            flexGrow: 1,
        },
        fab: {
            margin: theme.spacing(1),
        },
        table: {
            minWidth: 650,
        },
        tableWrapper: {
            overflowX: 'auto',
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        tag: {
            fontSize: '18px',
        },
        tableTitle: {
            flex: '1 1 100%',
        },
        form: {
            padding: '24px',
            margin: '48px inherit 48px inherit',
            minWidth: 650,
        },
        button: {
            margin: theme.spacing(1),
        },
        show: {
            display: 'show',
        },
        hide: {
            display: 'none',
        }
    })
);

function GetPlatformIcon(props: { tag: any, classes: any }) {
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
}

function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

const TranslationsForm: React.FC<any> = ({dataSelected, tags, locales, actionType, onCancel, onEditEntity, onCreateEntity}) => {
    const classes = translationsFormStyles();
    const [editAction, editActionTable] = useState(false);
    const [data, setData] = useState(dataSelected);

    const cancel = () => {
        setData(initialTranslation);
        onCancel();
    };
    const changedValues = (e: any, property: string) => {
        setData({
            ...data,
            [property]: e.target.value
        });
    };
    const changeValuesBoolean = (e: any, property: string) => {
        setData({
            ...data,
            [property]: e.target.value.toLowerCase() !== "true"
        });
    };
    const changeItemValuesBoolean = (e: any, property: any, item: any) => {
        setData({
            ...data,
            [property]: {
                ...data[property],
                [item]: e.target.value.toLowerCase() !== "true"
            }
        });
    };
    const changeItemValues = (e: any, property: any, item: any) => {
        setData({
            ...data,
            [property]: {
                ...data[property],
                [item]: e.target.value
            }
        });
    };
    const changeValuesOfArray = (e: any, property: keyof TranslationState, key: string) => {
        let values = (data[property] as any);
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

    return (
        <form className={classes.form}>
            <Grid container spacing={3}>
                <Grid container item direction="row" justify="center" xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom>
                        {actionType === 'edit' ?
                            'Translation id: ' + data.id :
                            'Create a new Locale'
                        }
                    </Typography>
                    <Divider variant="middle"/>
                    <Typography variant="overline" display="block" gutterBottom>
                        Last updated by: {data.updateUser.name}({data.updateUser.privilege})
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id={'key_' + data.id}
                        label={'key'}
                        fullWidth
                        value={data.key}
                        onChange={(e) => changedValues(e, 'key')}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="category"
                        label="category"
                        fullWidth
                        autoComplete="fcategory"
                        onChange={(e) => changedValues(e, 'category')}
                        value={data.category !== null ? data.category.name : ''}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="context"
                        label="context"
                        fullWidth
                        autoComplete="fcontext"
                        onChange={(e) => changedValues(e, 'context')}
                        value={data.context}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    {tags.map((tagItem: any) => {
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
                {locales.map((row: LocaleState) => (
                    <Grid item xs={12} sm={6} key={'translation_' + row.key}>
                        <TextField
                            id={'translation_' + row.key}
                            label={row.key.toUpperCase()}
                            multiline
                            rows="4"
                            variant="filled"
                            fullWidth
                            defaultValue={prop((data.translations as any), row.key)}
                            onChange={(e) => changeItemValues(e, 'translations', row.key)}
                        />

                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={prop((data.confirmedTranslations as any), row.key)}
                                        onChange={(e) => changeItemValuesBoolean(e, 'confirmedTranslations', row.key)}
                                        value={prop((data.confirmedTranslations as any), row.key)}
                                        color="primary"
                                    />
                                }
                                label="Confirmed"
                            />
                        </FormGroup>
                    </Grid>))}
                <Grid container item direction="row" justify="flex-end" xs={12} sm={12}>
                    <Button className={classes.button}
                            onClick={e => cancel()}>Return</Button>
                    {actionType === 'edit' ? (
                        <Button variant="contained" color="primary"
                                onClick={e => onEditEntity(data)}
                                className={classes.button}> Save </Button>
                    ) : (
                        <Button variant="contained" color="primary"
                                onClick={e => onCreateEntity(data)}
                                className={classes.button}> Create </Button>
                    )}
                </Grid>
            </Grid>
        </form>
    );


};

export default TranslationsForm;
