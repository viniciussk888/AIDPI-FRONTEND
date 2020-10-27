import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
//import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography, makeStyles, IconButton } from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import calcAge from 'src/utils/calcAge';
import Edit from '@material-ui/icons/Edit'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  results: {
    margin: theme.spacing(2)
  }
}));

const Results = ({ className, patients, ...rest }) => {
  const classes = useStyles();

  function editPatient(id) {
    localStorage.setItem('patientEdit', id)
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  PACIENTE
                </TableCell>
                <TableCell>
                  CPF
                </TableCell>
                <TableCell>
                  Nº SUS
                </TableCell>
                <TableCell>
                  DIAGNÓSTICO
                </TableCell>
                <TableCell>
                  RESPONSÁVEL
                </TableCell>
                <TableCell>
                  DATA
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.length === 0 && <Typography className={classes.results}>Nenhum resultado!</Typography>}
              {patients.map((patient) => (
                <TableRow
                  hover
                  key={patient.id}
                >
                  <TableCell padding="checkbox">
                    <Link to="/app/newpatient">
                      <IconButton onClick={() => (editPatient(patient.id))} color="primary">
                        <Edit />
                      </IconButton>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      { /*getInitials(patient.name)*/}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {patient.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <TableCell>
                      {calcAge(patient.birthDate)}
                    </TableCell>
                  </TableCell>
                  <TableCell>
                    {getInitials(patient.sex)}
                  </TableCell>
                  <TableCell>
                    {patient.cpf}
                  </TableCell>
                  <TableCell>
                    {patient.sus}
                  </TableCell>
                  <TableCell>
                    {patient.district}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card >
  );
};

Results.propTypes = {
  className: PropTypes.string,
  patients: PropTypes.array.isRequired
};

export default Results;
