import React, { useState } from 'react';
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

function createData(name) {
  return { name };
}

const rows = [
  createData('UPA'),
  createData('POSTO SAO FRANCISCO'),
  createData('POSTO CENTRO'),
  createData('POSTO SAO BENTO'),
  createData('UPA 2'),
];

const FormPostService = ({ className, ...rest }) => {
  const classes = useStyles();

  const [name, setName] = useState('')
  const [district, setDistrict] = useState('')
  const [adress, setAdress] = useState('')
  const [city, setCity] = useState('')

  async function handleCreatePostService(e) {
    e.preventDefault()
    console.log(
      name,
      district,
      adress,
      city
    )
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
                      <TableCell align="right">Deletar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton>
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


      </Card>
    </form>
  );
};

FormPostService.propTypes = {
  className: PropTypes.string
};

export default FormPostService;
