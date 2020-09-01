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

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alertErro, setAlertError] = useState(false)


  async function handleUpdatePassword(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      return setAlertError(true)
    }
    console.log(
      password
    )
    setAlertError(false)
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
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
