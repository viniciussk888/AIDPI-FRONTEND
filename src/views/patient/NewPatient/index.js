import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  FormControlLabel,
  Checkbox,
  Button,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Box,
  Card,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../services/api'
import { useSelector } from 'react-redux';

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

const sexo = [
  {
    value: 'Masculino',
    label: 'Masculino'
  },
  {
    value: 'Feminino',
    label: 'Feminino'
  }
]

const bloodType = [
  {
    value: 'Sangue A+',
    label: 'Sangue A+'
  },
  {
    value: 'Sangue A-',
    label: 'Sangue A-'
  },
  {
    value: 'Sangue B+',
    label: 'Sangue B+'
  },
  {
    value: 'Sangue B-',
    label: 'Sangue B-'
  },
  {
    value: 'Sangue AB+',
    label: 'Sangue AB+'
  },
  {
    value: 'Sangue AB-',
    label: 'Sangue AB-'
  },
  {
    value: 'Sangue O+',
    label: 'Sangue O+'
  },
  {
    value: 'Sangue O-',
    label: 'Sangue O-'
  }
]

const colors = [
  {
    value: 'Branco(a)',
    label: 'Branco(a)'
  },
  {
    value: 'Pardo(a)',
    label: 'Pardo(a)'
  },
  {
    value: 'Amarelo(a)',
    label: 'Amarelo(a)'
  },
  {
    value: 'Negro(a)',
    label: 'Negro(a)'
  }
  ,
  {
    value: 'Índio(a)',
    label: 'Índio(a)'
  }
];


const NewPatient = ({ className, pacient, ...rest }) => {
  const notifySucess = () => toast.success("Paciente cadastrado com sucesso!");
  const notifyError = () => toast.error("Ocorreu um erro ao realizar cadastro!");
  const classes = useStyles();

  const [name, setName] = useState('')
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
  const [active, setActive] = useState(true)

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };
  async function fecthEditPatient(id) {
    try {
      const response = await api.get(`patients/${id}`, config)
      console.log(response.data)
      setName(response.data.name)
      setColor(response.data.color)
      setSex(response.data.sex)
      setTypeBlood(response.data.typeBlood)
      setWeight(response.data.weight)
      setLength(response.data.length)
      setTax(response.data.tax)
      setSus(response.data.sus)
      setCpf(response.data.cpf)
      setRg(response.data.rg)
      setBirthDate(response.data.birthDate)
      setPhone(response.data.phone)
      setAdress(response.data.adress)
      setDistrict(response.data.district)
      setCity(response.data.city)
      setNumber(response.data.number)
      setMotherName(response.data.motherName)
      setFatherName(response.data.fatherName)
      setNotes(response.data.notes)
      setSpecialPatient(response.data.specialPatient)
      setActive(response.data.active)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const id = localStorage.getItem('patientEdit')
    localStorage.setItem('patientEdit', null)
    if (id > 0) {
      fecthEditPatient(id)
    }
  }, [])


  async function handleSubmitPatientForm(e) {
    e.preventDefault()
    try {
      await api.post('patients', {
        name,
        color,
        sex,
        typeBlood,
        weight,
        length,
        tax,
        sus,
        cpf,
        rg,
        birthDate,
        phone,
        adress,
        district,
        city,
        number,
        motherName,
        fatherName,
        notes,
        specialPatient,
        active
      }, config)
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
              subheader="Informe as informações do paciente"
              title="Paciente"
            />
          </Card>
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
                  label="Nome completo"
                  name="name"
                  onChange={e => setName(e.target.value)}
                  required
                  value={name}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Cor"
                  name="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {colors.map((option) => (
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
                md={2}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Sexo"
                  value={sex}
                  name="sexo"
                  onChange={e => setSex(e.target.value)}
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {sexo.map((option) => (
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
                md={2}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Tipo sanguineo"
                  name="blood"
                  value={typeBlood}
                  onChange={e => setTypeBlood(e.target.value)}
                  required
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {bloodType.map((option) => (
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
                md={1}
                xs={12}
              >
                <TextField
                  type="number"
                  fullWidth
                  label="Peso"
                  name="weight"
                  onChange={e => setWeight(e.target.value)}
                  value={weight}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={1}
                xs={12}
              >
                <TextField
                  type="number"
                  fullWidth
                  label="Comp."
                  name="length"
                  onChange={e => setLength(e.target.value)}
                  value={length}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={1}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="T.áx"
                  name="tax"
                  onChange={e => setTax(e.target.value)}
                  value={tax}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={12}
              >
                <TextField
                  type="number"
                  fullWidth
                  label="Nº SUS"
                  name="nsus"
                  onChange={e => setSus(e.target.value)}
                  required
                  value={sus}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={12}
              >
                <TextField
                  type="number"
                  fullWidth
                  label="CPF"
                  value={cpf}
                  name="cpf"
                  onChange={e => setCpf(e.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={12}
              >
                <TextField
                  type="number"
                  fullWidth
                  label="RG"
                  value={rg}
                  name="rg"
                  onChange={e => setRg(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  helperText="Data de nascimento *"
                  name="datenasc"
                  onChange={e => setBirthDate(e.target.value)}
                  type="date"
                  value={birthDate}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={2}
                xs={12}
              >
                <TextField
                  fullWidth
                  type="number"
                  label="Telefone de contato"
                  name="phone"
                  onChange={e => setPhone(e.target.value)}
                  value={phone}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={4}
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
                md={2}
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
                md={1}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Numero"
                  name="number"
                  onChange={e => setNumber(e.target.value)}
                  required
                  value={number}
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
                  label="Nome da mãe"
                  name="mothername"
                  onChange={e => setMotherName(e.target.value)}
                  value={motherName}
                  required
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
                  label="Nome do pai"
                  name="fathername"
                  value={fatherName}
                  onChange={e => setFatherName(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Observação"
                  value={notes}
                  name="obs"
                  onChange={e => setNotes(e.target.value)}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={<Checkbox onChange={() => (setSpecialPatient(!specialPatient))} color="secondary" name="saveAddress" checked={specialPatient} value={specialPatient} />}
                  label="Paciente especial"
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <FormControlLabel
                  control={<Checkbox onChange={() => (setActive(!active))} color="secondary" name="saveAddress" checked={active} value={active} />}
                  label="Ativo"
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

NewPatient.propTypes = {
  className: PropTypes.string
};

export default NewPatient;
