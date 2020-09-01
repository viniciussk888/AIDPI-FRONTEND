import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Card,
  CardHeader,
  Divider,
  CardContent,
  makeStyles,
  IconButton
} from '@material-ui/core';
import Edit from "@material-ui/icons/Edit"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
  container: {
    maxHeight: 360,
  },
  editButton: {
    fontSize: 18
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('BCG', 'OK', '20/05/2020', 'ENF. JOAO CARLOS'),
  createData('Hep B', '', '', ''),
  createData('Penta¹', '', '', ''),
  createData('VIP¹', '', '', ''),
  createData('VORH¹', '', '', ''),
  createData('PNM10¹', '', '', ''),
  createData('MNG C¹', '', '', ''),
  createData('Penta²', '', '', ''),
  createData('VIP²', '', '', ''),
  createData('VORH ²', '', '', ''),
  createData('PNM10²', '', '', ''),
  createData('MNG C²', '', '', ''),
  createData('Penta³', '', '', ''),
  createData('VIP³', '', '', ''),
  createData('Gripe', '', '', ''),
  createData('FA', '', '', ''),
  createData('Hep A', '', '', ''),
  createData('Tríplice V', '', '', ''),
  createData('Tetra V', '', '', ''),
  createData('MNG C(R)', '', '', ''),
  createData('PNM10(R)', '', '', ''),
  createData('VOP(1º R)', '', '', ''),
  createData('DTP(1º R)', '', '', ''),
  createData('VOP(2º R)', '', '', ''),
  createData('DTP(2º R)', '', '', ''),
];


const VaccinationCard = ({ className, product, ...rest }) => {
  const classes = useStyles();
  return (
    <>
      <Paper elevation={3}>
        <Card>
          <CardHeader
            title="ANTONIO MATEUS SOUSA COSTA"
            subheader="Relação de vacinas"
          />
          <Divider />
          <CardContent>
            <TableContainer className={classes.container} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>VACINA</TableCell>
                    <TableCell align="">SITUAÇÃO</TableCell>
                    <TableCell align="">DATA</TableCell>
                    <TableCell align="">RESPONSAVEL</TableCell>
                    <TableCell align="right">APLICAR</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        <strong>{row.name}</strong>
                      </TableCell>
                      <TableCell align="">{row.calories}</TableCell>
                      <TableCell align="">{row.fat}</TableCell>
                      <TableCell align="">{row.carbs}</TableCell>
                      <TableCell align="right">
                        <IconButton >
                          <Edit className={classes.editButton} color="primary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>


        </Card>

      </Paper>
    </>
  );
};

VaccinationCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default VaccinationCard;
