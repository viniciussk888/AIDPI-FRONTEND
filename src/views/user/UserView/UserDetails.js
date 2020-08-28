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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userType = [
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

const serviceStationArray = [
  {
    value: 'UPA',
    label: 'UPA'
  },
  {
    value: 'POSTO SAO CRISTOVÃO',
    label: 'POSTO SAO CRISTOVÃO'
  },
  {
    value: 'ATENDIMENTO EM CAMPO',
    label: 'ATENDIMENTO EM CAMPO'
  }
];

const useStyles = makeStyles(() => ({
  root: {},
}));

const UserDetails = ({ className, ...rest }) => {
  const notifySucess = () => toast.success("Usuário cadastrado com sucesso!");
  const notifyError = () => toast.error("Ocorreu um erro ao realizar cadastro!");
  const classes = useStyles();

  const [customers] = useState(data);

  const [controlUpdate, setControlUpdate] = useState(false)

  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [adress, setAdress] = useState('')
  const [office, setOffice] = useState('Enfermeiro(a)')
  const [serviceStation, setServiceStation] = useState('UPA')
  const [aidpi, setAidpi] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [active, setActive] = useState(false)



  async function handleSubmitUserForm(e) {
    e.preventDefault()

    try {
      console.log(
        name,
        login,
        password,
        email,
        phone,
        city,
        district,
        adress,
        office,
        serviceStation,
        aidpi,
        admin,
        active,
      )
      notifySucess()
    } catch (error) {
      notifyError()
    }
  }

  function toTop() {
    setControlUpdate(true)
  }

  return (
    <>
      <span id='topo'></span>
      <form
        autoComplete="off"
        className={clsx(classes.root, className)}
        onSubmit={handleSubmitUserForm}
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
                  name="name"
                  onChange={e => setName(e.target.value)}
                  required
                  value={name}
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
                  label="Login"
                  name="login"
                  onChange={e => setLogin(e.target.value)}
                  required
                  value={login}
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
                  type="password"
                  label="Senha"
                  name="password"
                  onChange={e => setPassword(e.target.value)}
                  required
                  value={password}
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
                  onChange={e => setEmail(e.target.value)}
                  required
                  value={email}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  label="Telefone"
                  name="phone"
                  onChange={e => setPhone(e.target.value)}
                  type="number"
                  value={phone}
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
                  onChange={e => setCity(e.target.value)}
                  required
                  value={city}
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
                  name="district"
                  onChange={e => setDistrict(e.target.value)}
                  required
                  value={district}
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
                  name="adress"
                  onChange={e => setAdress(e.target.value)}
                  required
                  value={adress}
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
                  onChange={e => setOffice(e.target.value)}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={office}
                  variant="outlined"
                >
                  {userType.map((option) => (
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
                  name="serviceStation"
                  onChange={e => setServiceStation(e.target.value)}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={serviceStation}
                  variant="outlined"
                >
                  {serviceStationArray.map((option) => (
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
                  control={<Checkbox onChange={() => (setActive(!active))} color="secondary" name="active" value={active} />}
                  label="Inativo"
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={<Checkbox onChange={() => (setAdmin(!admin))} color="secondary" name="admin" value={admin} />}
                  label="Admin"
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={<Checkbox onChange={() => (setAidpi(!aidpi))} color="secondary" name="aidpi" value={aidpi} />}
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
            {
              controlUpdate ?
                <Button
                  color="primary"
                  variant="contained"
                >
                  Atualizar
        </Button>
                :
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Gravar
          </Button>
            }

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
    </>
  );
};

UserDetails.propTypes = {
  className: PropTypes.string
};

export default UserDetails;
