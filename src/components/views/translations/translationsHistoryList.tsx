import React from "react";
import {TableCell, TableHead, TableRow} from "@material-ui/core";
import {TranslationHistoryState, TranslationState} from "store/translations/types";
import {category, confirmedTranslations, platformTags, translationInfo} from "components/common/utilsTable";

interface PropsTranslationsHistoryColumns {
    columns: string[]
}

export const TranslationsHistoryColumns: React.FC<any> = (props: PropsTranslationsHistoryColumns) => {
    return (
        <TableHead>
            {(props.columns).map((column: string) => (
                <TableCell>{column}</TableCell>
            ))}
        </TableHead>
    )
};

interface PropsTranslationsRows {
    data: TranslationHistoryState
}

export const TranslationsHistoryRows: React.FC<any> = (props: PropsTranslationsRows) => {

    const printTableCells = (translation: TranslationState) => {
        return (
            <TableRow key={translation.id}>
                <TableCell component="th" scope="row">{translation.id}</TableCell>
                <TableCell component="th" scope="row">{category(translation.category)}</TableCell>
                <TableCell component="th" scope="row">{confirmedTranslations(translation.confirmedTranslations)}</TableCell>
                <TableCell component="th" scope="row">{translation.context}</TableCell>
                <TableCell component="th" scope="row">{new Date(translation.insertionDate).toDateString()}</TableCell>
                <TableCell component="th" scope="row">{translation.key}</TableCell>
                <TableCell component="th" scope="row">{platformTags(translation.tags)}</TableCell>
                <TableCell component="th" scope="row">{translationInfo(translation.translations)}</TableCell>
                <TableCell component="th" scope="row">{new Date(translation.updateDate).toDateString()}</TableCell>
            </TableRow>
        )
    };

    return (
        <TableHead>
            {props.data.history.map((translation: TranslationState) =>
                printTableCells(translation)
            )}
        </TableHead>
    )
};
