import React, {useState} from 'react';
import {useSelector} from "react-redux";

import {IconButton, Paper} from "@material-ui/core";

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {enhancedTableStyles} from "styles/table";
import MaterialTable, {MTableToolbar} from "material-table";
import LanguageSelector from "components/common/languageSelector";
import {confirmedTranslations} from "components/common/utilsTable";
import PermissionsProvider, {checkPermissions} from "components/common/permissionsProvider";
import {LanguageState} from "store/languages/types";
import {TranslationsStore} from "store/types";
import {TranslationState} from "store/translations/types";
import {initialTranslation} from "store/translations/reducers";
import {CategoryState} from "store/categories/types";
import {UserState} from "store/user/types";
import {allowedRoles} from "store";
import {FiltersState} from "store/filters/types";
import {GetPlatformIcon} from "components/common/utilsForm";

interface PropsTranslationsList {
    translations: TranslationState[],
    user: UserState,
    categories: CategoryState[],
    tags: string[],
    filters: FiltersState,
    setDataSelected: (data: TranslationState) => void,
    getHistoryTranslation: (data: any) => void,
    setEditForm: (editForm: boolean) => void,
    setShowForm: (showForm: boolean) => void,
    openDialog: () => void
}

const TranslationsList: React.FC<any> = (props: PropsTranslationsList) => {
    const classes = enhancedTableStyles();
    const user = useSelector((state: TranslationsStore) => state.user);
    const [language, setLanguage] = useState(props.filters.language ? props.filters.language : user.associatedLanguages[0]);
    const [filterTags, setFilterTags] = useState<Array<any>>(props.filters.tags);
    const [filterCategory, setFilterCategory] = useState(props.filters.category);
    const [filterTranslations, setFilterTranslations] = useState(props.filters.category);
    const [filterConfirmed, setFilterConfirmed] = useState('');
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

    const actions = (): any[] => {
        return checkPermissions(allowedRoles, props.user.privilege) ? [
            {
                icon: 'edit',
                tooltip: 'Edit Translation',
                iconProps: {color: 'primary'},
                onClick: (event: any, rowData: any) => loadFormEditData(rowData)
            },
            {
                icon: 'delete',
                tooltip: 'Delete Translation',
                iconProps: {color: 'secondary'},
                onClick: (event: any, rowData: any) => deleteData(rowData)
            }
        ] : []
    };
    const toolbar = (propsTable: any) => {
        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'row', paddingTop: '15px'}}>
                    <MTableToolbar {...propsTable} />
                    <LanguageSelector language={language} forPlayers={false}
                                      handleLanguage={handleLanguage}/>
                    <PermissionsProvider
                        child={<IconButton style={{width: '50px', height: '50px'}} aria-label="add"
                                           onClick={() => loadFormAddData()}>
                            <AddCircleOutlineIcon color="primary"/>
                        </IconButton>} privileges={['Admin']}/>
                </div>
            </div>
        )
    };
    const getColumns = (language: LanguageState) => {
        function getColumnConfig(title: string, field: string, disablePadding: boolean, lookup: any,
                                 searchable: boolean, filtering: boolean, sorting: boolean,
                                 defaultFilter: any, label: string, filterCellStyle: any, customFilterAndSearch: any, render: any) {
            return {
                title: title,
                field: field,
                disablePadding: disablePadding,
                lookup: lookup,
                searchable: searchable,
                filtering: filtering,
                sorting: sorting,
                defaultFilter: defaultFilter,
                label: label,
                filterCellStyle: filterCellStyle,
                customFilterAndSearch: customFilterAndSearch,
                render: render
            };
        }

        const columns: any[] = [
            getColumnConfig('Key', 'key', false,
                null, true, false,
                false, null,
                'Key', null,
                null, null),
            getColumnConfig('Tags', 'tags', false,
                getFilterTags(), false, true,
                false, filterTags, 'Key',
                null, (filter: Array<any>, rowData: TranslationState) => {
                    setFilterTags(filter);
                    return filter.length !== 0 ? filter.sort().join(',') === rowData.tags.sort().join(',') : true;

                }, (rowData: TranslationState) => {
                    return rowData.tags.map((tag: any) => (
                        <GetPlatformIcon key={tag} tag={tag} classes={classes}/>
                    ))
                }),
            getColumnConfig('Category', 'category', false, getFilterCategories(),
                false, true, false, filterCategory, 'Category', null,
                (filter: any, rowData: TranslationState) => {
                    setFilterCategory(filter);
                    return (filter.length !== 0 ? filter.indexOf(rowData.category !== null ? rowData.category.id : '') > -1 : true);
                }, (rowData: TranslationState) =>
                    <div>{rowData.category !== null ? rowData.category.name : ''}</div>
            ),
            getColumnConfig('Translations', 'translations', false, null,
                false, true, false, filterTranslations, 'Translations', {padding: '16px 15px 0px 15px'},
                (filter: any, rowData: TranslationState) => {
                    setFilterTranslations(filter);
                    return (filter.length !== 0 ? rowData.translations[language.key].search(filter) !== -1 : true);
                }, (rowData: TranslationState) =>
                    <div>{rowData.translations !== null ? rowData.translations[language.key] : ''}</div>
            ),
            getColumnConfig('Confirmed', 'confirmedTranslations', false, {true: 'Confirmed', false: 'No Confirmed'},
                false, true, false, filterConfirmed, 'Confirmed', null,
                (filter: any, rowData: TranslationState) => {
                    setFilterConfirmed(filter);
                    if (filter.length === 1) {
                        return (rowData.confirmedTranslations[language.key] === (filter[0] === 'true'));
                    } else if (filter.length === 2) {
                        return (rowData.confirmedTranslations[language.key] === (filter[0] === 'true') && rowData.confirmedTranslations[language.key] === (filter[1] === 'true'));
                    }
                    return true;
                }, (rowData: TranslationState) => confirmedTranslations(rowData.confirmedTranslations, {true: 'confirmed', false: 'unconfirmed'})
            ),
            getColumnConfig('Rejected', 'koTranslations', false, null,
                false, false,false, null, 'ko', null, null,
                (rowData: TranslationState) => confirmedTranslations(rowData.koTranslations, {true: 'true', false: 'false'})
            ),
            getColumnConfig('Updated date', 'updateDate', false, null,
                false, false, true, null, 'UDate', null,
                null, (rowData: TranslationState) => <div>{new Date(rowData.updateDate).toDateString()}</div>
            )
        ];
        return columns;
    };

    return (
        <Paper className={classes.root}>
            <MaterialTable
                title={'Translations'}
                columns={getColumns(language)}
                data={props.translations}
                components={{Toolbar: props => toolbar(props)}}
                actions={actions()}
                options={{search: true, filtering: true}}
                onRowClick={(event, rowData: any) => props.getHistoryTranslation(rowData)}
                isLoading={props.translations.length === 1}/>
        </Paper>
    );
};

export default TranslationsList;

