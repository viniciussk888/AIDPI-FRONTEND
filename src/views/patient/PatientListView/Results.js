import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
//import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography, makeStyles, IconButton } from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import calcAge from 'src/utils/calcAge';
import Edit from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, patients, ...rest }) => {
  const classes = useStyles();

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
                  EDITAR
                </TableCell>
                <TableCell>
                  NOME
                </TableCell>
                <TableCell>
                  IDADE
                </TableCell>
                <TableCell>
                  SEXO
                </TableCell>
                <TableCell>
                  CPF
                </TableCell>
                <TableCell>
                  Nº SUS
                </TableCell>
                <TableCell>
                  BAIRRO
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow
                  hover
                  key={patient.id}
                >
                  <TableCell padding="checkbox">
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
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
