import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  CardContent,
  Divider,
  Box,
  Card,
  makeStyles,
  IconButton,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
//STEPS
import RiskSigns from './RiskSigns';
import PaymentForm from './PaymentForm';
import Review from './Review';
import api from 'src/services/api';

const steps = [
  'SINAIS GERAIS DE PERIGO',
  'TOSSE OU DIFICULDADE PARA RESPIRAR',
  'SINAIS DE DIARREIA',
  'SINAIS DE FEBRE',
  'PROBLEMA DE OUVIDO',
  'DOR DE GARGANTA',
  'DESNUTRIÇÃO OU ANEMIA',
  'SITUAÇÃO DAS VACINAS'
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <RiskSigns />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

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
  },
  appBar: {
    position: 'relative',
    display: 'flex',
    padding: 2,
    justifyContent: 'center'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(2),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  buttonSearch: {
    marginLeft: theme.spacing(2)
  },
  buttonFlex: {
    display: 'flex'
  }
}));


const NewAidpi = ({ className, ...rest }) => {
  const notifySucess = () => toast.success("Operação realizada com sucesso!");
  const notifyError = () => toast.error("Ocorreu um erro ao realizar na operação!");
  const classes = useStyles();

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  const [searchPatientSus, setSearchPatientSus] = useState('')
  const [patient, setPatient] = useState([])

  async function handleSubmitPatientForm(e) {
    e.preventDefault()
    try {
      notifySucess()
    } catch (error) {
      notifyError()
    }

  }

  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  async function searchPatientWithSus() {
    if (!searchPatientSus) {
      return alert("Informe o Nº do SUS!")
    }
    try {
      const response = await api.post(`searchwithsus`, {
        searchPatientSus
      }, config)
      setPatient(response.data[0])
      notifySucess()
    } catch (error) {
      console.log(error)
      notifyError()
    }
  }

  function patientInfo() {
    if (!patient || patient.length === 0) {
      return <h4>Nenhum paciente!</h4>
    }
    return (
      <>
        <React.Fragment>
          <CssBaseline />
          <AppBar color="default" className={classes.appBar}>
            <p>Nome: <strong>{patient.name}</strong> Sexo: <strong>{patient.sex}</strong> SUS: <strong>{patient.sus}</strong></p>
            <p>Bairro: <strong>{patient.district}</strong> Rua: <strong>{patient.adress}</strong> Numero: <strong>{patient.number}</strong></p>
          </AppBar>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Card container>
                <PerfectScrollbar>
                  <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </PerfectScrollbar>
              </Card>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #2001539. We have emailed your order confirmation, and will
                      send you an update when your order has shipped.
                </Typography>
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      {getStepContent(activeStep)}
                      <div className={classes.buttons}>
                        {activeStep !== 0 && (
                          <Button variant="outlined" onClick={handleBack} className={classes.button}>
                            Retornar
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? 'Gravar' : 'Avançar'}
                        </Button>
                      </div>
                    </React.Fragment>
                  )}
              </React.Fragment>
            </Paper>
          </main>
        </React.Fragment>
      </>
    )
  }

  return (
    <>
      <form
        onSubmit={handleSubmitPatientForm}
        autoComplete="off"
        className={clsx(classes.root)}
        {...rest}
      >
        <Card>
          <Card className={classes.cardHeader}>

            <IconButton onClick={() => (window.history.back())}>
              <ArrowBackIos /><h5>Voltar</h5>
            </IconButton>

            <CardContent className={classes.buttonFlex}>

              <Box maxWidth={1000} className={classes.boxSearch}>
                <TextField
                  type="number"
                  fullWidth
                  value={searchPatientSus}
                  onChange={e => setSearchPatientSus(e.target.value)}
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
                  placeholder="Nº do SUS"
                  variant="outlined"
                />

              </Box>
              <Button
                color="primary"
                variant="contained"
                className={classes.buttonSearch}
                onClick={searchPatientWithSus}
              >
                BUSCAR PACIENTE
        </Button>
            </CardContent>
          </Card>
          <Divider />
          <CardContent>

            {patientInfo()}

          </CardContent>
          <Divider />
        </Card>

      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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

NewAidpi.propTypes = {
  className: PropTypes.string
};

export default NewAidpi;
