import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import UserDetails from './UserDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Usuários"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <UserDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
