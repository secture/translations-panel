import React from "react";
import AppleIcon from "@material-ui/core/SvgIcon/SvgIcon";
import AndroidIcon from '@material-ui/icons/Android';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';

export const prop = <T, K extends keyof T>(obj: T, key: K, defaultValue: any) => {
    if (typeof obj[key] === "undefined") {
        return defaultValue;
    } else {
        return obj[key];
    }
};

export const GetPlatformIcon = (props: { tag: any, classes: any }) => {
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
};
