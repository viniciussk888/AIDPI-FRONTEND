import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import PerfectScrollbar from 'react-perfect-scrollbar';
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

import api from '../../../services/api'

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
  buttons: {
    display: "flex"
  },
  buttonDelete: {
    color: 'red'
  }
}));

const UserDetails = ({ className, ...rest }) => {
  const notifySucess = () => toast.success("Operação realizada com sucesso!");
  const notifyError = () => toast.error("Ocorreu um erro ao realizar a operação!");
  const classes = useStyles();

  const [controlUpdate, setControlUpdate] = useState(false)
  const [control, setControl] = useState(false)

  const [users, setUsers] = useState([])

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
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
  const [active, setActive] = useState(true)

  const config = {
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTU5OTE4MTg0OX0.eOrfm0WKTJXpXDqmQIIYCpMEqGfHb1ZMngwK3i1ppZU` }
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get('users', config)
        setUsers(response.data)
      } catch (error) {
        notifyError()
      }
    }
    fetchUsers()
  }, [controlUpdate, control])

  async function handleSubmitUserForm(e) {
    e.preventDefault()

    try {
      const response = await api.post(`users`, {
        name: name,
        username: username,
        password: password,
        email: email,
        phone: phone,
        city: city,
        district: district,
        adress: adress,
        office: office,
        serviceStation: serviceStation,
        aidpi: aidpi,
        admin: admin,
        active: active
      }, config)
      notifySucess()
      setControl(!control)
    } catch (error) {
      notifyError()
    }
  }

  async function updateUser() {
    if (password === "" || password === null) {
      return alert("Defina uma senha!")
    }
    try {
      const response = await api.put(`users/${id}`, {
        name: name,
        username: username,
        password: password,
        email: email,
        phone: phone,
        city: city,
        district: district,
        adress: adress,
        office: office,
        serviceStation: serviceStation,
        aidpi: aidpi,
        admin: admin,
        active: active
      }, config)
      notifySucess()
      window.location.reload()
    } catch (error) {
      console.log(error)
      notifyError()
    }
  }
  async function deleteUser(id) {
    var r = window.confirm("Confirma DELETAR PERMANENTEMENTE o usuário?");
    if (r == true) {
      try {
        await api.delete(`users/${id}`, config)
        notifySucess()
        setControl(!control)
      } catch (error) {
        console.log(error)
        notifyError()
      }
    }
  }

  function toTop(user) {
    setControlUpdate(true)

    setId(user.id)
    setName(user.name)
    setUsername(user.username)
    setEmail(user.email)
    setPhone(user.phone)
    setCity(user.city)
    setDistrict(user.district)
    setAdress(user.adress)
    setOffice(user.office)
    setServiceStation(user.serviceStation)
    setAidpi(user.aidpi)
    setAdmin(user.admin)
    setActive(user.active)
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
                  name="username"
                  onChange={e => setUsername(e.target.value)}
                  required
                  value={username}
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
                  control={<Checkbox onChange={() => (setActive(!active))} checked={active} color="secondary" name="active" value={active} />}
                  label="Ativo"
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={<Checkbox onChange={() => (setAdmin(!admin))} checked={admin} color="secondary" name="admin" value={admin} />}
                  label="Admin"
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={<Checkbox onChange={() => (setAidpi(!aidpi))} checked={aidpi} color="secondary" name="aidpi" value={aidpi} />}
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
                  onClick={updateUser}
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
                    E-MAIL
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
                {users.map((user) => (
                  <TableRow
                    hover
                    key={user.id}
                  >
                    <TableCell padding="checkbox">
                      <div className={classes.buttons}>
                        <IconButton href="#topo" onClick={() => (toTop(user))} color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton className={classes.buttonDelete} onClick={() => (deleteUser(user.id))} color="secundary">
                          <Delete />
                        </IconButton>
                      </div>
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
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {user.serviceStation}
                    </TableCell>
                    <TableCell>
                      {user.office}
                    </TableCell>
                    <TableCell>
                      {user.admin ? "SIM" : "NÃO"}
                    </TableCell>
                    <TableCell>
                      {user.aidpi ? "SIM" : "NÃO"}
                    </TableCell>
                    <TableCell>
                      {user.active ? "SIM" : "NÃO"}
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
