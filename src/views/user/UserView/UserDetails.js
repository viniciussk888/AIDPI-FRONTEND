import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import Edit from '@material-ui/icons/Edit'
import PerfectScrollbar from 'react-perfect-scrollbar';
import data from './data';
import {
  FormControlLabel,
  Checkbox,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField, Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography, makeStyles, IconButton
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
  root: {},
}));

const UserDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
  });

  const [customers] = useState(data);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  function toTop() {
    alert('deu certo')
  }

  return (
    <>
      <span id='topo'></span>
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
      <br />
      {/*LISTA DE USUARIOS*/}

      <Card>
        <CardHeader
          title="Lista de usuários"
        />
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    EDITAR
                </TableCell>
                  <TableCell>
                    NOME
                </TableCell>
                  <TableCell>
                    CPF
                </TableCell>
                  <TableCell>
                    POSTO
                </TableCell>
                  <TableCell>
                    CARGO
                </TableCell>
                  <TableCell>
                    ADMIN
                </TableCell>
                  <TableCell>
                    AIDPI
                </TableCell>
                  <TableCell>
                    ATIVO
                </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow
                    hover
                    key={customer.id}
                  >
                    <TableCell padding="checkbox">
                      <IconButton href="#topo" onClick={toTop} color="primary">
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Box
                        alignItems="center"
                        display="flex"
                      >
                        { /*getInitials(customer.name)*/}
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {customer.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                    </TableCell>
                    <TableCell>
                      {customer.phone}
                    </TableCell>
                    <TableCell>
                      {moment(customer.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    </>
  );
};

UserDetails.propTypes = {
  className: PropTypes.string
};

export default UserDetails;
