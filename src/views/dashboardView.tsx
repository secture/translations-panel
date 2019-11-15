import React from 'react';
import { useSelector } from 'react-redux'
import { TranslationsStore } from "store/types";
import {AssociatedLanguage, UserState} from "store/user/types";

/* Material UI */
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import {dashboardViewStyles} from "../styles/dashboard";

const DashboardView = () => {
    const classes = dashboardViewStyles();
    const user: UserState = useSelector((state: TranslationsStore) => state.user);
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={classes.root}>
                            <Box display="flex" alignItems="center">
                                <Avatar className={classes.orangeAvatar}>{user.privilege.charAt(0).toUpperCase()}</Avatar>
                                <Box display="flex" flexDirection="column" letterSpacing={6} >
                                    <Typography variant="h5" component="h3">
                                        {user.name}
                                    </Typography>
                                    <Typography variant="caption" >
                                        {user.privilege}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider variant="middle" />
                            <Box m={2}>
                                <Chip icon={<MailOutlineIcon />} label={user.email} color="primary" />
                                <Box mt={2} px={2} border={1} borderColor="grey.300" borderRadius={6}>
                                    <List>
                                        {user.associatedLanguages.map((language: AssociatedLanguage) =>  (
                                            <Box key={language.id}>
                                                <ListItem disableGutters>
                                                    <ListItemAvatar>
                                                        <Avatar className={classes.avatar}><span>🇪🇸</span></Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={language.name}
                                                        secondary={language.key}
                                                    />
                                                </ListItem>
                                            </Box>
                                        ))}
                                    </List>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={classes.root}>
                            <Typography>
                                Chart % traducciones confirmadas / no confirmadas para cada idioma
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={classes.root}>
                            <Typography>
                                Chart % claves traducidas / no traducidas del idioma X
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
};

export default DashboardView;
