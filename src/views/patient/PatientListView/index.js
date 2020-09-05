import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import Page from 'src/components/Page';
import Results from './Results';
import clsx from 'clsx';
import { Search as SearchIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import api from 'src/services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1)
  },
  boxSearch: {
    display: 'flex'
  },
  buttonSearch: {
    marginLeft: theme.spacing(2)
  }
}));

const CustomerListView = () => {
  const notifySucess = () => toast.success("Operação realizada com sucesso!");
  const notifyError = () => toast.error("Ocorreu um erro ao realizar a operação!");
  const classes = useStyles();
  const [searchName, setSearchName] = useState('')
  const [patients, setPatients] = useState([])

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };


  const handleSearchPatient = useCallback(async () => {
    try {
      const response = await api.get(`patients/${searchName}`, config)
      setPatients([response.data])
      notifySucess()
    } catch (error) {
      notifyError()
    }
  })

  return (
    <Page
      className={classes.root}
      title="Pacientes"
    >
      <Container maxWidth={false}>
        <div
          className={clsx(classes.root)}
        >
          <Box
            display="flex"
            justifyContent="flex-end"
          >
            <Link to="/app/newpatient">
              <Button
                color="primary"
                variant="contained"
              >
                Cadastrar paciente
        </Button>
            </Link>
          </Box>
          <Box mt={3}>
            <Card>
              <CardContent>
                <Box maxWidth={600} className={classes.boxSearch}>
                  <TextField
                    fullWidth
                    onChange={e => setSearchName(e.target.value)}
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
                    placeholder="Buscar paciente pelo nome"
                    variant="outlined"
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.buttonSearch}
                    onClick={handleSearchPatient}
                  >
                    BUSCAR
        </Button>
                </Box>

              </CardContent>

            </Card>

          </Box>
        </div>
        <Box mt={3}>
          <Results patients={patients} />
        </Box>
      </Container>
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
    </Page>
  );
};

export default CustomerListView;
