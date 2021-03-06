import React from 'react';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';
import Page from 'src/components/Page';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="404"
    >
      <Link to='/'>
        <IconButton>
          <ArrowBackIos /><h5>Voltar</h5>
        </IconButton>
      </Link>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >

        <Container maxWidth="md">

          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            404:
            A página que você está procurando não está aqui
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >

            Ou você tentou um caminho obscuro ou veio aqui por engano.
            Seja o que for, tente usar a navegação
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/static/images/aidpi.png"
            />
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;
