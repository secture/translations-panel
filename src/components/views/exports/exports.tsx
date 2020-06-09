import React from "react";
import {TranslationsStore} from "store/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import {getExportsByPlatform} from "services/exports";

import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {Card, CardHeader, CardContent, CardActions, IconButton, Typography, Avatar} from '@material-ui/core';
import AndroidIcon from '@material-ui/icons/Android';
import AppleIcon from '@material-ui/icons/Apple';
import ComputerIcon from '@material-ui/icons/Computer';
import GetAppIcon from '@material-ui/icons/GetApp';

type AppStateProps = ReturnType<typeof mapStateToProps>;
type AppDispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppProps = AppStateProps & AppDispatchProps;

const useStylesExports = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            backgroundColor: theme.palette.primary.main
        },
        cardActions: {
            padding: '8px 16px'
        }
    }),
);

const Exports: React.FC<any> = (props: AppProps) => {
    const classes = useStylesExports();

    const handleDownloadFile = () => {
        props.getExportsByPlatformAction(props.tag);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        {(() => {
                            switch (props.tag) {
                                case 'android':
                                    return <AndroidIcon/>;
                                case 'ios':
                                    return <AppleIcon/>;
                                case 'web':
                                    return <ComputerIcon/>;
                            }
                        })()}
                    </Avatar>
                }
                title={`Platform ${props.tag}`}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    You could download file associated with the platform {props.tag} 🧐
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <IconButton aria-label="download file" color="secondary" onClick={() => {
                    handleDownloadFile()
                }}>
                    <GetAppIcon/>
                </IconButton>
            </CardActions>
        </Card>
    )
};

const mapStateToProps = (store: TranslationsStore, props: any) => {
    return {
        tag: props.tag
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getExportsByPlatformAction: (id: string) => dispatch(getExportsByPlatform(id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Exports);
