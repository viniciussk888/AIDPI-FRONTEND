import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import api from '../../../services/api'

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const notifySucess = () => toast.success("Operação realizada com sucesso!");
  const notifyError = () => toast.error("Ocorreu um erro ao realizar a operação!");
  const classes = useStyles();
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alertErro, setAlertError] = useState(false)
  const id = useSelector(state => state.id)

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };


  async function handleUpdatePassword(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      return setAlertError(true)
    }

    try {
      await api.put(`users/${id}`, {
        password
      }, config)
      setAlertError(false)
      notifySucess()
    } catch (error) {
      console.log(error)
      notifyError()
      setAlertError(false)
    }

  }

  return (
    <form
      onSubmit={handleUpdatePassword}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Atualizar senha de usuário"
          title="Senha"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Senha"
            margin="normal"
            name="password"
            onChange={e => setPassword(e.target.value)}
            type="password"
            value={password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirmar senha"
            margin="normal"
            name="confirm"
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
            value={confirmPassword}
            variant="outlined"
          />
        </CardContent>
        {alertErro && <Alert severity="error">As senhas não conferem!</Alert>}
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Atualizar
          </Button>
        </Box>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
