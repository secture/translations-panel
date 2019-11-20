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
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect, useSelector} from "react-redux";
import {TranslationsStore} from "store/types";
import {TranslationState} from "store/translations/types";
import {initialTranslation} from "store/translations/reducers";
import {confirmedTranslations} from "components/common/utilsTable";
import {CategoryState} from "store/categories/types";

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
    const user = useSelector((state: TranslationsStore) => state.user);
    const [language, setLanguage] = useState(user.associatedLanguages[0]);
    const handleLanguage = (language: LanguageState) => {
        setLanguage(language)
    };
    const loadFormAddData = () => {
        props.setEditForm(false);
        props.setDataSelected(initialTranslation);
        props.setShowForm(true);
    };

    const loadFormEditData = (data: TranslationState) => {
        props.setEditForm(true);
        props.setDataSelected(data);
        props.setShowForm(true);
    };

    const deleteData = (data: TranslationState) => {
        props.setDataSelected(data);
        props.openDialog();
    };

    const getFilterTags = () => {
        let items: { [key: string]: string } = {};
        props.tags.map((tagItem: string) => {
            items[tagItem] = tagItem;
        });
        return items;
    };

    const getFilterCategories = () => {
        let items: { [key: string]: string } = {};
        props.categories.map((catItem: CategoryState | any) => {
            items[catItem.id] = catItem.name;
        });
        return items;
    };

    const getColumns = (language: LanguageState) => {
        const columns: any[] = [
            {
                title: 'Key',
                field: 'key',
                disablePadding: false,
                searchable: true,
                filtering: false,
                sorting: false,
                label: 'Key'
            },
            {
                title: 'Tags',
                field: 'tags',
                disablePadding: false,
                lookup: getFilterTags(),
                searchable: false,
                filtering: true,
                sorting: false,
                label: 'Tags',
                customFilterAndSearch: (filter: Array<any>, rowData: TranslationState) => {
                    return filter.length !== 0 ? filter.sort().join(',') === rowData.tags.sort().join(',') : true;

                },
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
                lookup: getFilterCategories(),
                searchable: false,
                filtering: true,
                sorting: false,
                label: 'Category',
                customFilterAndSearch: (filter: any, rowData: TranslationState) => {
                    return (filter.length !== 0 ? filter.indexOf(rowData.category.id) > -1 : true);
                },
                render: (rowData: TranslationState) =>
                    <div>{rowData.category !== null ? rowData.category.name : ''}</div>
            },
            {
                title: 'Translations',
                field: 'translations',
                disablePadding: false,
                searchable: false,
                filtering: true,
                sorting: false,
                filterCellStyle: {
                    padding: '16px 15px 0px 15px'
                },
                label: 'Translations',
                customFilterAndSearch: (filter: any, rowData: TranslationState) => {
                    return (filter.length !== 0 ? rowData.translations[language.key].search(filter) !== -1 : true);
                },
                render: (rowData: TranslationState) =>
                    <div>{rowData.translations !== null ? rowData.translations[language.key] : ''}</div>
            },
            {
                title: 'Confirmed',
                field: 'confirmedTranslations',
                lookup: {true: 'Confirmed', false: 'No Confirmed'},
                disablePadding: false,
                searchable: false,
                sorting: false,
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
                render: (rowData: TranslationState) => confirmedTranslations(rowData.confirmedTranslations)
            },
            {
                title: 'Updated date',
                field: 'updateDate',
                disablePadding: false,
                searchable: false,
                filtering: false,
                sorting: true,
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
                                <LanguageSelector language={language} forPlayers={false}
                                                  handleLanguage={handleLanguage}/>
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
                isLoading={props.data.length === 1}/>
        </Paper>
    );
};

const mapStateToProps = (store: TranslationsStore, props: any) => {
    return {
        data: props.translations,
        categories: props.categories,
        tags: props.tags,
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

