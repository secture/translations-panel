import React, {useState} from "react";
import {useSelector} from "react-redux";
import {TranslationsStore} from "store/types";
import {LanguageState} from "store/languages/types";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface PropsLanguageSelector {
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

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const language = languages.find((language: LanguageState) => language.name === event.target.value);
        if (typeof language !== 'undefined') {
            props.handleLanguage(language);
        }
    };

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    const languages = useSelector((state: TranslationsStore) => state.languages);

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
                {
                    languages.map((language: LanguageState) => (
                        language.localeForPlayers &&
                        <MenuItem value={language.name}>{language.icon} {language.name}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
};

export default LanguageSelector;
