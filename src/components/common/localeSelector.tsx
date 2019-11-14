import React, {useState} from "react";
import {LocaleState} from "store/locales/types";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useSelector} from "react-redux";
import {TranslationsStore} from "store/types";

interface PropsLocaleSelector {
    locale: LocaleState,
    handleLocale: (locale: LocaleState) => void
}

const localeSelectorStyles = makeStyles((theme: Theme) =>
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

const LocaleSelector: React.FC<any> = (props: PropsLocaleSelector) => {
    const classes = localeSelectorStyles();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const locale = locales.find((locale: LocaleState) => locale.name === event.target.value);
        if (typeof locale !== 'undefined') {
            props.handleLocale(locale);
        }
    };

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    const locales = useSelector((state: TranslationsStore) => state.locales);

    return (
        <FormControl className={classes.formControl} style={{margin: '0 26px'}}>
            <InputLabel ref={inputLabel} id="labelLocales">
                Languages
            </InputLabel>
            <Select
                labelId="labelLocales"
                id="selectLocales"
                value={props.locale.name}
                onChange={handleChange}
                labelWidth={labelWidth}
            >
            {
                locales.map((locale: LocaleState) => (
                    locale.localeForPlayers && <MenuItem value={locale.name}>{locale.icon} {locale.name}</MenuItem>
                ))
            }
            </Select>
        </FormControl>
    );
};

export default LocaleSelector;
