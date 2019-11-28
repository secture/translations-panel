import React, {useState} from "react";
import {useSelector} from "react-redux";
import {TranslationsStore} from "store/types";
import {LanguageState} from "store/languages/types";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';

interface PropsLanguageSelector {
    forPlayers: boolean,
    language: LanguageState,
    handleLanguage: (language: LanguageState) => void
}

const languageSelectorStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 150,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const LanguageSelector: React.FC<any> = (props: PropsLanguageSelector) => {
    const classes = languageSelectorStyles();
    const languages = useSelector((state: TranslationsStore) => state.languages);
    const user = useSelector((state: TranslationsStore) => state.user);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const lng = languages.find((language: LanguageState) => language.name === event.target.value);
        if (typeof lng !== 'undefined') {
            props.handleLanguage(lng);
        }
    };
    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);


    return (
        <FormControl className={classes.formControl} style={{margin: '0 26px'}}>
            <InputLabel ref={inputLabel} id="labelLanguages">
                Languages
            </InputLabel>
            <Select
                labelId="labelLanguages"
                id="selectLanguages"
                value={props.language.name}
                onChange={handleChange}
                labelWidth={labelWidth}
            >
                {props.forPlayers ?
                    languages.map((languageItem: LanguageState) => (
                        languageItem.localeForPlayers &&
                        <MenuItem key={languageItem.id}
                                  value={languageItem.name}>{languageItem.icon} {languageItem.name}</MenuItem>
                    )) :
                    user.associatedLanguages.map((languageItem: LanguageState) => {
                            return <MenuItem key={languageItem.id}
                                             value={languageItem.name}>{languageItem.icon} {languageItem.name}</MenuItem>
                        }
                    )
                }
            </Select>
        </FormControl>
    );
};

export default LanguageSelector;
