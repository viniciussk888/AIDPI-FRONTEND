import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Divider,
  Grid,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Delete from '@material-ui/icons/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import api from '../../../services/api'

const useStyles = makeStyles(({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    maxHeight: 320,
  },
  deleteIcon: {
    color: 'red',
    fontSize: 20
  }
}));


const FormPostService = ({ className, ...rest }) => {
  const notifySucess = () => toast.success("Operação realizada com sucesso!");
  const notifyError = () => toast.error("Ocorreu um erro ao realizar na operação!");
  const classes = useStyles();

  const [servicesStations, setServicesStations] = useState([])

  const [control, setControl] = useState(false)

  const [name, setName] = useState('')
  const [district, setDistrict] = useState('')
  const [adress, setAdress] = useState('')
  const [city, setCity] = useState('')

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  useEffect(() => {
    async function fetchServiceStation() {
      try {
        const response = await api.get('servicesstations', config)
        setServicesStations(response.data)
      } catch (error) {
        notifyError()
      }
    }
    fetchServiceStation()
  }, [control, config])

  async function handleCreatePostService(e) {
    e.preventDefault()
    try {
      await api.post('servicesstations', {
        name: name,
        district: district,
        adress: adress,
        city: city
      }, config)
      notifySucess()
      setControl(!control)
    } catch (error) {
      console.log(error)
      notifyError()
    }
  }

  async function deleteServiceStation(id) {
    var r = window.confirm("Confirma DELETAR PERMANENTEMENTE o cadastro?");
    if (r === true) {
      try {
        await api.delete(`servicesstations/${id}`, config)
        notifySucess()
        setControl(!control)
      } catch (error) {
        console.log(error)
        notifyError()
      }
    }
  }

  return (
    <form
      onSubmit={handleCreatePostService}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Ajustes e configurações"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={2}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={6}
              sm={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                POSTOS DE ATENDIMENTO
              </Typography>
              <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell align="left">Bairro</TableCell>
                      <TableCell align="left">Cidade</TableCell>
                      <TableCell align="right">Deletar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {servicesStations.map((serviceStation) => (
                      <TableRow key={serviceStation.id}>
                        <TableCell component="th" scope="row">
                          {serviceStation.name}
                        </TableCell>
                        <TableCell align="left">
                          {serviceStation.district}
                        </TableCell>
                        <TableCell align="left">
                          {serviceStation.city}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => (deleteServiceStation(serviceStation.id))}>
                            <Delete className={classes.deleteIcon} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid
              className={classes.item}
              item
              md={6}
              sm={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                CADASTRAR NOVO
              </Typography>
              <TextField
                fullWidth
                label="Nome"
                name="name"
                required
                variant="outlined"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <br />
              <TextField
                fullWidth
                label="Bairro"
                name="district"
                required
                variant="outlined"
                value={district}
                onChange={e => setDistrict(e.target.value)}
              />
              <br />
              <TextField
                fullWidth
                label="Endereço"
                name="adress"
                required
                variant="outlined"
                value={adress}
                onChange={e => setAdress(e.target.value)}
              />
              <br />
              <TextField
                fullWidth
                label="Cidade"
                name="city"
                required
                variant="outlined"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
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
                  Cadastrar
          </Button>
              </Box>
            </Grid>

          </Grid>
        </CardContent>
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
      </Card>
    </form>
  );
};

FormPostService.propTypes = {
  className: PropTypes.string
};

export default FormPostService;
