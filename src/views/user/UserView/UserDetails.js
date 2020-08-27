import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const states = [
  {
    value: 'Enfermeiro(a)',
    label: 'Enfermeiro(a)'
  },
  {
    value: 'Administrativo',
    label: 'Administrativo'
  },
  {
    value: 'Diretor',
    label: 'Diretor'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const UserDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            subheader="A informação pode ser editada"
            title="Usuário"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Nome"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Sobrenome"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Telefone"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Cidade"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Bairro"
                  name="adress"
                  onChange={handleChange}
                  required
                  value={values.country}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Endereço"
                  name="adress2"
                  onChange={handleChange}
                  required
                  value={values.country}
                  variant="outlined"
                />
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Cargo"
                  name="office"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                  variant="outlined"
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Posto de atendimento"
                  name="office"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                  variant="outlined"
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="Inativo"
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="Admin"
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="AIDPI"
                />
              </Grid>

            </Grid>
          </CardContent>
          <Divider />
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <Button
              color="primary"
              variant="contained"
            >
              Gravar
          </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

UserDetails.propTypes = {
  className: PropTypes.string
};

export default UserDetails;
