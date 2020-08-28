import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  FormControlLabel,
  Checkbox,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Box,
  Card,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    margin: theme.spacing(2)
  },
  cardHeader: {
    display: 'flex'
  }
}));


const NewPatient = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const sexo = [
    {
      value: 'Masculino',
      label: 'Masculino'
    },
    {
      value: 'Feminino',
      label: 'Feminino'
    }
  ]

  const bloodType = [
    {
      value: 'Sangue A+',
      label: 'Sangue A+'
    },
    {
      value: 'Sangue A-',
      label: 'Sangue A-'
    },
    {
      value: 'Sangue B+',
      label: 'Sangue B+'
    },
    {
      value: 'Sangue B-',
      label: 'Sangue B-'
    },
    {
      value: 'Sangue AB+',
      label: 'Sangue AB+'
    },
    {
      value: 'Sangue AB-',
      label: 'Sangue AB-'
    },
    {
      value: 'Sangue O+',
      label: 'Sangue O+'
    },
    {
      value: 'Sangue O-',
      label: 'Sangue O-'
    }
  ]

  const colors = [
    {
      value: 'Branco(a)',
      label: 'Branco(a)'
    },
    {
      value: 'Pardo(a)',
      label: 'Pardo(a)'
    },
    {
      value: 'Amarelo(a)',
      label: 'Amarelo(a)'
    },
    {
      value: 'Negro(a)',
      label: 'Negro(a)'
    }
    ,
    {
      value: 'Índio(a)',
      label: 'Índio(a)'
    }
  ];

  return (
    <>
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root)}
        {...rest}
      >
        <Card>
          <Card className={classes.cardHeader}>
            <IconButton onClick={() => (window.history.back())}>
              <ArrowBackIos /><h5>Voltar</h5>
            </IconButton>
            <CardHeader
              subheader="Informe as informações do paciente"
              title="Paciente"
            />
          </Card>
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
                  label="Nome completo"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Cor"
                  name="color"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {colors.map((option) => (
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
                md={2}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Sexo"
                  name="sexo"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {sexo.map((option) => (
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
                md={2}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Tipo sanguineo"
                  name="blood"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {bloodType.map((option) => (
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
                md={3}
                xs={12}
              >
                <TextField
                  type="number"
                  fullWidth
                  label="Nº SUS"
                  name="nsus"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  type="number"
                  fullWidth
                  label="CPF"
                  name="email"
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  type="number"
                  fullWidth
                  label="RG"
                  name="rg"
                  onChange={handleChange}
                  required
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
                  helperText="Data de nascimento"
                  name="datenasc"
                  onChange={handleChange}
                  type="date"
                  value={values.phone}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={12}
              >
                <TextField
                  fullWidth
                  type="number"
                  label="Telefone de contato"
                  name="phone"
                  onChange={handleChange}
                  required
                  value={values.country}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={4}
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
                md={2}
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
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Cidade"
                  name="city"
                  onChange={handleChange}
                  required
                  value={values.country}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={1}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Numero"
                  name="number"
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
                  label="Nome da mãe"
                  name="mothername"
                  onChange={handleChange}
                  required
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
                  label="Nome do pai"
                  name="fathername"
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Observação"
                  name="obs"
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="Paciente especial"
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="Inativo"
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

NewPatient.propTypes = {
  className: PropTypes.string
};

export default NewPatient;
