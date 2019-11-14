import React from "react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

interface PropsFiltersPlayers {
    translated: boolean,
    confirmed: boolean,
    handleTranslated: () => void,
    handleConfirmed: () => void
}

const FiltersPlayers: React.FC<any> = (props: PropsFiltersPlayers) => {
    return (
        <FormGroup row>
            <FormControlLabel
                control={<Switch checked={props.confirmed} onChange={props.handleConfirmed} value='confirmedPlayer' />}
                label="Confirmed"
            />
            <FormControlLabel
                control={<Switch checked={props.translated} onChange={props.handleTranslated} value='translatedPlayer' />}
                label="Translated"
            />
        </FormGroup>
    )
};

export default FiltersPlayers;
