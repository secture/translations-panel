import {PlayerState} from "store/players/types";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import React, {ReactElement} from "react";
import {LanguageState} from "store/languages/types";

const playerNames = (rowData: PlayerState, shortName: boolean) => {
    return (
        <div>
            {Object.keys(shortName ? rowData.shortName: rowData.largeName).map((key: any)=> (
                <Chip style={{marginBottom: "5px"}}
                      avatar={<Avatar color="secondary">{key}</Avatar>}
                      label={ shortName ? rowData.shortName[key]: rowData.largeName[key]}
                      color="primary"
                />)
            )}
        </div>
    )
};

const confirmedTranslations = (rowData: PlayerState) => {
    return (
        <div>
            {Object.keys(rowData.confirmedTranslations).map((key: any)=> (
                <Chip style={{marginBottom: "5px"}}
                      avatar={<Avatar>{key}</Avatar>}
                      label={rowData.confirmedTranslations[key] ? 'confirm' : 'unconfirmed'}
                      color={rowData.confirmedTranslations[key] ? 'primary' : 'secondary'}
                />)
            )}
        </div>
    )
};

const customSearch = (filter: any, rowData: PlayerState, language: LanguageState) => {
    return (rowData.shortName[language.key].toLowerCase().includes(filter.toLocaleLowerCase()) &&
        rowData.largeName[language.key].toLowerCase().includes(filter.toLocaleLowerCase()));
};

const filterByTranslated = (filter: any, rowData: PlayerState, language: LanguageState) => {
    if (filter instanceof Array) {
        if (filter.length === 1) {
            return (filter[0] === 'true') ? (rowData.shortName[language.key] !== 'NO_TEXT' && rowData.largeName[language.key] !== 'NO_TEXT'):
                (rowData.shortName[language.key] === 'NO_TEXT' && rowData.largeName[language.key] === 'NO_TEXT')

        } else if (filter.length === 2) {
            return (filter[0] === 'true' && filter[1] === 'true') ?
                (rowData.shortName[language.key] !== 'NO_TEXT' && rowData.largeName[language.key] !== 'NO_TEXT') && (rowData.shortName[language.key] !== 'NO_TEXT' && rowData.largeName[language.key] !== 'NO_TEXT'):
                (rowData.shortName[language.key] === 'NO_TEXT' && rowData.largeName[language.key] !== 'NO_TEXT') && (rowData.shortName[language.key] === 'NO_TEXT' && rowData.largeName[language.key] !== 'NO_TEXT');
        }
        return true;
    }
    return false;
};

const filterByConfirmed = (filter: any, rowData: PlayerState, language: LanguageState) => {
    if (filter.length === 1) {
        return (rowData.confirmedTranslations[language.key] === (filter[0] === 'true'));
    } else if (filter.length === 2) {
        return (rowData.confirmedTranslations[language.key] === (filter[0] === 'true') && rowData.confirmedTranslations[language.key] === (filter[1] === 'true'));
    }
    return true;
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
        {title: 'Short name', field: 'shortName', disablePadding: false, searchable: true, filtering: false, label: 'Short name',
            customFilterAndSearch: (filter: string, rowData: PlayerState) => customSearch(filter, rowData, language),
            render: (rowData: PlayerState) => playerNames(rowData, true)
        },
        {title: 'Large name', field: 'largeName', lookup: { true: 'Translated', false: 'Untranslated' }, disablePadding: false, searchable: false, filtering: true, label: 'Large name',
            customFilterAndSearch: (filter: string, rowData: PlayerState) => filterByTranslated(filter, rowData, language),
            render: (rowData: PlayerState) => playerNames(rowData, false)},
        {title: 'Confirmed', field: 'confirmedTranslations', lookup: { true: 'Confirmed', false: 'No Confirmed' }, disablePadding: false, searchable: false, filtering: true, label: 'Confirmed',
            customFilterAndSearch: (filter: any, rowData: PlayerState) => filterByConfirmed(filter, rowData, language),
            render: (rowData: PlayerState) => confirmedTranslations(rowData)},
        {title: 'Insertion date', field: 'insertionDate', disablePadding: false, searchable: true, filtering: false, label: 'IDate', render: (rowData: PlayerState) => <div>{new Date(rowData.insertionDate).toDateString()}</div>},
        {title: 'Updated date', field: 'updateDate', disablePadding: false, searchable: true, filtering: false, label: 'UDate', render: (rowData: PlayerState) => <div>{new Date(rowData.updateDate).toDateString()}</div>},
        {title: 'Insertion user', field: 'insertionUser', disablePadding: false, searchable: true, filtering: false, label: 'IUser', render: (rowData: PlayerState) => <div>{rowData.insertionUser.name}</div>},
        {title: 'Updated user', field: 'updateUser', disablePadding: false, searchable: true, filtering: false, label: 'UDate', render: (rowData: PlayerState) => <div>{rowData.updateUser.name}</div>},
        {title: 'Team', field: 'team', disablePadding: false, searchable: true, filtering: false, label: 'Team'},
        {title: 'Comments', field: 'comments', disablePadding: false, searchable: true, filtering: false, label: 'Comments'},
    ];
    return columns;
};
