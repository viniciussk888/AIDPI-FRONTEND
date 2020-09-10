import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Card,
  CardHeader,
  Divider,
  CardContent,
  makeStyles,
  IconButton,
  Typography,
  Grid,
  TextField,
  Button,
  Tooltip
} from '@material-ui/core';
import Edit from "@material-ui/icons/Edit"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import api from '../../../services/api'
import ModalComponent from '../../../components/ModalComponent'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import inverseDate from '../../../utils/inverseDate'
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  container: {
    maxHeight: 360,
  },
  editButton: {
    fontSize: 18
  },
  toltip: {
    display: "flex",
    justifyContent: "space-between"
  }
});

const VaccinationCard = ({ className, searchVaccines, vaccines, PatientName, id, ...rest }) => {
  // const notifySucess = () => toast.success("Operação realizada com sucesso!");
  const notifyError = () => toast.error("Ocorreu um erro ao realizar na operação!");
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [vaccine, setVaccine] = useState('');
  const [date, setDate] = useState('');
  const [responsible, setResponsible] = useState('');
  const [filter, setFilter] = useState('tudo');


  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  function showModal(vaccine) {
    setOpen(!open)
    setVaccine(vaccine)
  }

  async function handleApplyVaccine(e) {
    e.preventDefault()

    var r = window.confirm("CONFIRMA APLICAÇÃO? ATENÇÃO ESSA É UMA OPERAÇÃO SEM VOLTA!");
    if (r === true) {
      try {
        await api.put(`vaccines/${id}`, {
          name: vaccine,
          situation: "SIM",
          date,
          responsible
        }, config)
        searchVaccines()
        setOpen(!open)
      } catch (error) {
        notifyError()
      }
    }
  }

  function changeFilter() {
    filter === "SIM" ?
      setFilter("NÃO")
      :
      setFilter("SIM")
  }

  const body = (
    <>
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          VACINA: {vaccine}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              type="date"
              required
              id="date"
              name="date"
              onChange={e => setDate(e.target.value)}
              helperText="Data de aplicação"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              id="responsavel"
              name="responsavel"
              onChange={e => setResponsible(e.target.value)}
              label="Responsável"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleApplyVaccine}
            >
              CONFIRMAR VACINAÇÃO
              </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    </>
  );

  return (
    <>
      {open ? <ModalComponent open={true} body={body} vacinne={vaccine} /> : null}
      <Paper elevation={3}>
        <Card>
          <Grid className={classes.toltip} container spacing={2}>
            <Grid item xs={11} sm={11}>
              <CardHeader
                title={PatientName || "Nome"}
                subheader="Relação de vacinas"
              />
            </Grid>
            <Grid item xs={1} sm={1}>
              <Tooltip title="Filtrar por SIM e NÂO">
                <IconButton onClick={changeFilter} aria-label="Filtrar por SIM e NÂO">
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Divider />
          <CardContent>
            <TableContainer className={classes.container} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>VACINA</TableCell>
                    <TableCell align="">APLICADA</TableCell>
                    <TableCell align="">DATA</TableCell>
                    <TableCell align="">RESPONSÁVEL</TableCell>
                    <TableCell align="right">APLICAR</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vaccines.map((row) => (
                    filter === row.situation ||
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        <strong>{row.name}</strong>
                      </TableCell>
                      <TableCell align="">{row.situation}</TableCell>
                      <TableCell align="">{inverseDate(row.date)}</TableCell>
                      <TableCell align="">{row.responsible}</TableCell>
                      <TableCell align="right">
                        {row.situation === "NÃO" && <IconButton onClick={() => { showModal(row.name) }}>
                          <Edit className={classes.editButton} color="primary" />
                        </IconButton>}

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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

      </Paper>
    </>
  );
};

VaccinationCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default VaccinationCard;
