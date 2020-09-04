import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../services/api'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [messageError, setMessageError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPasword] = useState('')
  const [progress, setProgress] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setProgress(true)
    setMessageError('')
    try {
      const response = await api.post('sessions', {
        username,
        password
      })
      console.log(response)
      dispatch({
        type: 'LOG_IN',
        token: response.data[0].token,
        id: response.data[1].id,
        username: response.data[1].username,
        name: response.data[1].name,
        office: response.data[1].office,
        serviceStation: response.data[1].serviceStation,
        aidpi: response.data[1].aidpi,
        admin: response.data[1].admin,
        active: response.data[1].active,
        auth: 1
      });
      navigate('/app/dashboard', { replace: true });
      setProgress(false)
    } catch (error) {
      setMessageError("ERRO INTERNO: " + error)
      setProgress(false)
    }
  }

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <form onSubmit={handleLogin}>
            <Box mb={3}>
              <Typography
                color="textPrimary"
                variant="h2"
              >
                AIDPI
                  </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Faça login na plataforma interna
                  </Typography>
            </Box>

            <Box
              mt={3}
              mb={1}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                Insira seu usuário e senha
                  </Typography>
            </Box>
            <TextField
              fullWidth
              label="Usuário"
              margin="normal"
              name="username"
              onChange={e => setUsername(e.target.value)}
              type="username"
              value={username}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Senha"
              margin="normal"
              name="password"
              onChange={e => setPasword(e.target.value)}
              type="password"
              value={password}
              variant="outlined"
            />
            <Box my={2}>
              {progress ?
                <center>
                  <CircularProgress />
                </center>
                :
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  FAZER LOGIN
                  </Button>
              }
            </Box>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {messageError}
            </Typography>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
