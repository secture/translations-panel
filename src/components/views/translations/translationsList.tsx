import React, {useState} from 'react';
import {
    IconButton
} from "@material-ui/core";

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppleIcon from '@material-ui/icons/Apple';
import AndroidIcon from '@material-ui/icons/Android';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import {enhancedTableStyles} from "styles/table";
import Paper from "@material-ui/core/Paper";

import MaterialTable, {MTableToolbar} from "material-table";
import LanguageSelector from "components/common/languageSelector";
import {LanguageState} from "store/languages/types";
import {initialLanguage} from "store/languages/reducers";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import {TranslationsStore} from "store/types";
import {TranslationState} from "store/translations/types";
import {initialTranslation} from "store/translations/reducers";
import {PlayerState} from "store/players/types";
import {confirmedTranslations} from "../../common/utilsTable";

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

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const TranslationsList: React.FC<any> = (props: AppProps) => {
    const classes = enhancedTableStyles();
    const [language, setLanguage] = useState(initialLanguage);
    const handleLanguage = (language: LanguageState) => {
        setLanguage(language)
    };
    const loadFormAddData = () => {
        props.setEditForm(false);
        props.setDataSelected(initialTranslation);
        props.setShowForm(true);
    };

    const loadFormEditData = (player: TranslationState) => {
        props.setEditForm(true);
        props.setDataSelected(player);
        props.setShowForm(true);
    };

    const deleteData = (player: TranslationState) => {
        props.setDataSelected(player);
        props.openDialog();
    };

    const getColumns = (language: LanguageState) => {
        const columns: any[] = [
            {title: 'Key', field: 'key', disablePadding: false, searchable: true, filtering: false, label: 'Key'},
            {
                title: 'Tags',
                field: 'tags',
                disablePadding: false,
                searchable: false,
                filtering: false,
                label: 'Tags',
                render: (rowData: TranslationState) => {
                    return rowData.tags.map((tag: any) => (
                        <GetPlatformIcon key={tag} tag={tag} classes={classes}/>
                    ))
                }
            },
            {
                title: 'Category',
                field: 'category',
                disablePadding: false,
                searchable: false,
                filtering: false,
                label: 'Category',
                render: (rowData: TranslationState) =>
                    <div>{rowData.category !== null ? rowData.category.name : ''}</div>
            },
            {
                title: 'Translations',
                field: 'translations',
                disablePadding: false,
                searchable: false,
                filtering: false,
                label: 'Translations',
                render: (rowData: TranslationState) =>
                    <div>{rowData.translations !== null ? rowData.translations['es'] : ''}</div>
            },
            {
                title: 'Confirmed',
                field: 'confirmedTranslations',
                lookup: {true: 'Confirmed', false: 'No Confirmed'},
                disablePadding: false,
                searchable: false,
                filtering: true,
                label: 'Confirmed',
                customFilterAndSearch: (filter: any, rowData: TranslationState) => {
                    if (filter.length === 1) {
                        return (rowData.confirmedTranslations[language.key] === (filter[0] === 'true'));
                    } else if (filter.length === 2) {
                        return (rowData.confirmedTranslations[language.key] === (filter[0] === 'true') && rowData.confirmedTranslations[language.key] === (filter[1] === 'true'));
                    }
                    return true;
                },
                render: (rowData: PlayerState) => confirmedTranslations(rowData)
            },
            {
                title: 'Updated date',
                field: 'updateDate',
                disablePadding: false,
                searchable: true,
                filtering: false,
                label: 'UDate',
                render: (rowData: TranslationState) => <div>{new Date(rowData.updateDate).toDateString()}</div>
            },
        ];
        return columns;
    };

    return (
        <Paper className={classes.root}>
            <MaterialTable
                title={'Translations'}
                columns={getColumns(language)}
                data={props.data}
                components={{
                    Toolbar: (props) => (
                        <div>
                            <div style={{display: 'flex', flexDirection: 'row', paddingTop: '15px'}}>
                                <MTableToolbar {...props} />
                                <LanguageSelector language={language} handleLanguage={handleLanguage}/>
                                <IconButton style={{width: '50px', height: '50px'}} aria-label="add"
                                            onClick={() => loadFormAddData()}>
                                    <AddCircleOutlineIcon color="primary"/>
                                </IconButton>
                            </div>
                        </div>
                    ),
                }}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Translation',
                        iconProps: {color: 'primary'},
                        onClick: (event, rowData: any) => loadFormEditData(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Translation',
                        iconProps: {color: 'secondary'},
                        onClick: (event, rowData: any) => deleteData(rowData)
                    }
                ]}
                options={{
                    search: true,
                    filtering: true,
                }}
                isLoading={props.data.length === 0}/>
        </Paper>
    );
};

const mapStateToProps = (store: TranslationsStore, props: any) => {
    return {
        data: props.translations,
        setDataSelected: props.setDataSelected,
        setEditForm: props.setEditForm,
        setShowForm: props.setShowForm,
        openDialog: props.openDialog
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TranslationsList);

