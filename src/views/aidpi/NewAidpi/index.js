import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  CardContent,
  CardHeader,
  Divider,
  Box,
  Card,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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


const NewAidpi = ({ className, ...rest }) => {
  const notifySucess = () => toast.success("Operação realizada com sucesso!");
  const notifyError = () => toast.error("Ocorreu um erro ao realizar na operação!");
  const classes = useStyles();

  const test = useState('test')
  /*const [name, setName] = useState('')
  const [color, setColor] = useState('Branco(a)')
  const [sex, setSex] = useState('Masculino')
  const [typeBlood, setTypeBlood] = useState('Sangue A+')
  const [weight, setWeight] = useState('')
  const [length, setLength] = useState('')
  const [tax, setTax] = useState('')
  const [sus, setSus] = useState('')
  const [cpf, setCpf] = useState('')
  const [rg, setRg] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [phone, setPhone] = useState('')
  const [adress, setAdress] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')
  const [number, setNumber] = useState('')
  const [motherName, setMotherName] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [notes, setNotes] = useState('')
  const [specialPatient, setSpecialPatient] = useState(false)
const [active, setActive] = useState(false)*/

  async function handleSubmitPatientForm(e) {
    e.preventDefault()
    try {
      console.log(test)
      notifySucess()
    } catch (error) {
      notifyError()
    }

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
            <CardHeader
              subheader="Informe os dados solicitados"
              title="AIDPI"
            />
          </Card>
          <Divider />
          <CardContent>

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
              type="submit"
            >
              Gravar
          </Button>
          </Box>
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
