import React, {ReactElement} from "react";
import {PlayerState} from "store/players/types";
import {LanguageState} from "store/languages/types";
import {ConfirmedTranslations} from "store/translations/types";
import {UserState} from "store/user/types";
import {CategoryState} from "store/categories/types";
import {GetPlatformIcon} from "components/common/utilsForm";
import {Box, Typography, Avatar, Chip} from "@material-ui/core";

const NO_FIELD = 'NO_TEXT';

export const user = (rowData: UserState, color: string) => {
    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <Avatar aria-label="recipe" style={{background: `${color}`, marginRight: '15px'}}>
                {rowData.privilege.charAt(0).toUpperCase()}
            </Avatar>
            <Typography>
                {rowData.name}
            </Typography>
        </Box>
    )
};

export const category = (category: CategoryState) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="body2" component="p">
                {category.id}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
                {category.name}
            </Typography>
        </div>
    )
};

export const platformTags = (tags: string[]) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {tags.map((tag: string) => (
                <GetPlatformIcon tag={tag} classes={''}/>
            ))}
        </div>
    )
};

export const translationInfo = (translation: any) => {
    return (
        <div>
            {Object.keys(translation).map((key: any) => (
                <Chip style={{marginBottom: "5px"}}
                      avatar={<Avatar color="secondary">{key}</Avatar>}
                      label={translation[key]}
                      color="primary"
                />)
            )}
        </div>
    )
};

export const playerNames = (rowData: PlayerState, shortName: boolean) => {
    return (
        <div>
            {Object.keys(shortName ? rowData.shortName : rowData.largeName).map((key: any) => (
                <Chip style={{marginBottom: "5px"}}
                      avatar={<Avatar color="secondary">{key}</Avatar>}
                      label={shortName ? rowData.shortName[key] : rowData.largeName[key]}
                      color="primary"
                      key={'chip_player_' + key + '_' + rowData.id}
                />)
            )}
        </div>
    )
};

export const confirmedTranslations = (data: ConfirmedTranslations, text: { true: string, false: string }) => {
    return (
        <div>
            {Object.keys(data).map((key: string) => (
                <Chip key={'cT_' + data.id + '_' + key}
                      style={{marginBottom: "5px"}}
                      avatar={<Avatar>{key}</Avatar>}
                      label={data[key] ? text.true : text.false}
                      color={data[key] ? 'primary' : 'secondary'}
                />)
            )}
        </div>
    )
};

export const customSearch = (filter: any, rowData: PlayerState, language: LanguageState) => {
    return (rowData.shortName[language.key].toLowerCase().includes(filter.toLocaleLowerCase()) &&
        rowData.largeName[language.key].toLowerCase().includes(filter.toLocaleLowerCase()));
};

const filterByTranslated = (filter: any, rowData: PlayerState, language: LanguageState) => {
    return (filter.length > 0) ?
        (filter.indexOf('translated') > -1 && (rowData.shortName[language.key] !== NO_FIELD && rowData.largeName[language.key] !== NO_FIELD) ||
            filter.indexOf('unTranslated') > -1 && (rowData.shortName[language.key] === NO_FIELD && rowData.largeName[language.key] === NO_FIELD)) :
        true;
};

const filterByConfirmed = (filter: any, rowData: PlayerState, language: LanguageState) => {
    return (filter.length > 0) ?
        (filter.indexOf('confirmed') > -1 && rowData.confirmedTranslations[language.key]) || (filter.indexOf('unConfirmed') > -1 && !rowData.confirmedTranslations[language.key]) :
        true;
};

interface ColumnsPlayer {
    title: string,
    field: string,
    lookup?: {},
    disablePadding: boolean,
    searchable?: boolean,
    filtering?: boolean,
    label: string,
    customFilterAndSearch?: (filter: string, rowData: PlayerState) => boolean,
    render?: (rowData: PlayerState) => ReactElement
}

export const getColumns = (language: LanguageState) => {
    const columns: ColumnsPlayer[] = [
        {title: 'Id', field: 'playerMasterId', disablePadding: false, searchable: true, filtering: false, label: 'Id'},
        {
            title: 'Short name',
            field: 'shortName',
            disablePadding: false,
            searchable: true,
            filtering: false,
            label: 'Short name',
            customFilterAndSearch: (filter: string, rowData: PlayerState) => customSearch(filter, rowData, language),
            render: (rowData: PlayerState) => playerNames(rowData, true)
        },
        {
            title: 'Large name',
            field: 'largeName',
            lookup: {translated: 'Translated', unTranslated: 'Untranslated'},
            disablePadding: false,
            searchable: false,
            filtering: true,
            label: 'Large name',
            customFilterAndSearch: (filter: string, rowData: PlayerState) => filterByTranslated(filter, rowData, language),
            render: (rowData: PlayerState) => playerNames(rowData, false)
        },
        {
            title: 'Confirmed',
            field: 'confirmedTranslations',
            lookup: {confirmed: 'Confirmed', unConfirmed: 'No Confirmed'},
            disablePadding: false,
            searchable: false,
            filtering: true,
            label: 'Confirmed',
            customFilterAndSearch: (filter: any, rowData: PlayerState) => filterByConfirmed(filter, rowData, language),
            render: (rowData: PlayerState) => confirmedTranslations(rowData.confirmedTranslations, {
                true: 'confirmed',
                false: 'unconfirmed'
            })
        },
        {
            title: 'Rejected',
            field: 'koTranslations',
            disablePadding: false,
            searchable: false,
            filtering: false,
            label: 'Rejected',
            render: (rowData: PlayerState) => confirmedTranslations(rowData.koTranslations, {
                true: 'true',
                false: 'false'
            })
        },
        {
            title: 'Insertion date',
            field: 'insertionDate',
            disablePadding: false,
            searchable: true,
            filtering: false,
            label: 'IDate',
            render: (rowData: PlayerState) => <div>{new Date(rowData.insertionDate).toDateString()}</div>
        },
        {
            title: 'Updated date',
            field: 'updateDate',
            disablePadding: false,
            searchable: true,
            filtering: false,
            label: 'UDate',
            render: (rowData: PlayerState) => <div>{new Date(rowData.updateDate).toDateString()}</div>
        },
        {
            title: 'Insertion user',
            field: 'insertionUser',
            disablePadding: false,
            searchable: true,
            filtering: false,
            label: 'IUser',
            render: (rowData: PlayerState) => <div>{rowData.insertionUser.name}</div>
        },
        {
            title: 'Updated user',
            field: 'updateUser',
            disablePadding: false,
            searchable: true,
            filtering: false,
            label: 'UDate',
            render: (rowData: PlayerState) => <div>{rowData.updateUser.name}</div>
        },
        {title: 'Team', field: 'team', disablePadding: false, searchable: true, filtering: false, label: 'Team'},
        {
            title: 'Comments',
            field: 'comments',
            disablePadding: false,
            searchable: true,
            filtering: false,
            label: 'Comments'
        },
    ];
    return columns;
};
