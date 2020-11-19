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
import CoughingAndBreathing from './CoughingAndBreathing';
import Diarrhea from './Diarrhea';

import api from 'src/services/api';
import calcAge from 'src/utils/calcAge';
import getInitials from 'src/utils/getInitials';
import Fever from './Fever';
import EarProblem from './EarProblem';
import SoreThroat from './SoreThroat';
import Malnutrition from './Malnutrition';
import Vaccines from './Vaccines';

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
  },
  textArea: {
    minWidth: "100%",
  },
}));


const NewAidpi = ({ className, ...rest }) => {
  const notifySucess = () => toast.success("Operação realizada com sucesso!");
  const notifyError = () => toast.error("Ocorreu um erro ao realizar na operação!");
  const classes = useStyles();

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  const [activeStep, setActiveStep] = useState(0);
  const [searchPatientSus, setSearchPatientSus] = useState('')
  const [patient, setPatient] = useState([])
  const [risks, setRisks] = useState([])
  const [diagnosis, setDiagnosis] = useState([])

  function setNewDiagnosis(diagnosis) {
    setDiagnosis(diagnosis)
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <RiskSigns />;
      case 1:
        return <CoughingAndBreathing setNewDiagnosis={setNewDiagnosis} />;
      case 2:
        return <Diarrhea />;
      case 3:
        return <Fever />;
      case 4:
        return <EarProblem />;
      case 5:
        return <SoreThroat />;
      case 6:
        return <Malnutrition />;
      case 7:
        return <Vaccines />;
      default:
        throw new Error('Unknown step');
    }
  }
  async function handleSubmitPatientForm(e) {
    e.preventDefault()
    try {
      notifySucess()
    } catch (error) {
      notifyError()
    }

  }
  const handleNext = () => {
    const risk = JSON.parse(localStorage.getItem("risk")) || 0
    if (risk.length > 0) {
      setRisks(risk)
      setActiveStep(8)
      return alert("CRIANÇA COM SINAIS DE PERIGO!")
    }
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  async function searchPatientWithSus() {
    localStorage.setItem("risk", 0)
    if (!searchPatientSus) {
      return alert("Informe o Nº do SUS!")
    }
    try {
      const response = await api.post(`searchwithsus`, {
        searchPatientSus
      }, config)
      setPatient(response.data[0])
      notifySucess()
      setActiveStep(0)
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
            <p>Nome: <strong>{patient.name}</strong> Sexo: <strong>{getInitials(patient.sex)}</strong> SUS: <strong>{patient.sus}</strong> Idade:<strong> {calcAge(patient.birthDate)} anos</strong></p>
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
                    <br />
                    <Typography variant="h5" gutterBottom>
                      DIAGNÓSTICOS:
                </Typography>
                    <Typography variant="subtitle1">
                      <strong>{diagnosis}</strong><br />
                    </Typography>
                    <Typography variant="subtitle1">
                      {risks.length > 0 ?
                        <>
                          <strong>A criança apresenta sinal geral de perigo e necessita ser urgentemente tratada, completar imediatamente a avaliação, administrar o tratamento indicado prévio à referência e encaminhar urgentemente ao hospital.</strong>
                          <p>{localStorage.getItem("risk")}</p>
                        </>
                        :
                        <>
                          <label for="tratar">OBSERVAÇÔES</label>
                          <textarea
                            id="tratar"
                            className={classes.textArea}
                            placeholder="Escreva as considerações"
                            rows={10}
                          />
                          <br />
                          <TextField variant="outlined" type="date" id="returndate" helperText="Data do próximo retorno caso houver" />
                        </>
                      }
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
                          {activeStep === steps.length - 1 ? 'Finalizar' : 'Avançar'}
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
