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
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import RiskSigns from './RiskSigns';
import PaymentForm from './PaymentForm';
import Review from './Review';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const steps = ['SINAIS GERAIS DE PERIGO',
  'TOSSE OU DIFICULDADE PARA RESPIRAR',
  'SINAIS DE DIARREIA',
  'SINAIS DE FEBRE',
  'PROBLEMA DE OUVIDO',
  'DOR DE GARGANTA',
  'DESNUTRIÇÃO OU ANEMIA',
  'SITUAÇÃO DAS VACINAS'];

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

  const test = useState('test')
  /*const [name, setName] = useState('')
  const [weight, setWeight] = useState('')
  const [length, setLength] = useState('')
  const [tax, setTax] = useState('')
  const [sus, setSus] = useState('')
  const [birthDate, setBirthDate] = useState('')*/

  async function handleSubmitPatientForm(e) {
    e.preventDefault()
    try {
      console.log(test)
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
              >
                BUSCAR PACIENTE
        </Button>
            </CardContent>
          </Card>
          <Divider />
          <CardContent>


            <React.Fragment>
              <CssBaseline />
              <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                  <Typography variant="h6" color="inherit" noWrap>
                    Dados paciente
          </Typography>
                </Toolbar>
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


          </CardContent>
          <Divider />
        </Card>

      </form>
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

NewAidpi.propTypes = {
  className: PropTypes.string
};

export default NewAidpi;
