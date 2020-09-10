import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Button,
  Card,
  CardContent
} from '@material-ui/core';
//import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import { Search as SearchIcon } from 'react-feather';
import VaccinationCard from './VaccinationCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../services/api'
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  },
  font: {
    fontFamily: 'Roboto'
  },
  boxSearch: {
    display: 'flex'
  },
  buttonSearch: {
    marginLeft: theme.spacing(2)
  }
}));

const VaccinationList = () => {
  const notifySucess = () => toast.success("Operação realizada com sucesso!");
  const notifyError = () => toast.error("Ocorreu um erro ao realizar na operação!");
  const classes = useStyles();
  const [patientSus, setPatientSus] = useState('');
  const [PatientName, setPatientName] = useState('');
  const [id, setId] = useState('');
  const [vaccines, setVaccines] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  async function searchVaccines() {
    try {
      const response = await api.get(`vaccines/${patientSus}`, config)
      setVaccines(JSON.parse(response.data[0].vaccine_list))
      setPatientName(response.data[0].name)
      setId(response.data[0].id)
      notifySucess()
    } catch (error) {
      notifyError()
      console.log(error)
    }
  }

  return (
    <Page
      className={classes.root}
      title="Vacinação"
    >
      <Container maxWidth={false}>

        <Box mt={3}>
          <Card>
            <CardContent>
              <h5 className={classes.font}>Buscar pelo Nº do SUS</h5>
              <Box maxWidth={500} className={classes.boxSearch}>
                <TextField
                  type="number"
                  fullWidth
                  onChange={e => setPatientSus(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Buscar ficha de vacinação do paciente"
                  variant="outlined"
                />
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.buttonSearch}
                  onClick={searchVaccines}
                >
                  BUSCAR
        </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
            >
              <VaccinationCard
                className={classes.productCard}
                searchVaccines={searchVaccines}
                vaccines={vaccines}
                PatientName={PatientName}
                id={id}
              />
            </Grid>
          </Grid>
        </Box>
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
        {/*<Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>*/}
      </Container>
    </Page>
  );
};

export default VaccinationList;
