import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Card,
  CardHeader,
  Divider,
  CardContent,
  makeStyles
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Edit from "@material-ui/icons/Edit"

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '1º DOSE', amount: 3, ass: 'Enf. Joao Mauro' },
      { date: '2020-01-02', customerId: '2º DOSE', amount: 1, ass: 'Enf. Joao Mauro' },
      { date: '2020-01-02', customerId: '3º DOSE', amount: 1, ass: 'Enf. Joao Mauro' },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <strong> {row.name}</strong>
        </TableCell>
        <TableCell >{row.calories}</TableCell>
        <TableCell >{row.fat}</TableCell>
        <TableCell align="right">
          <IconButton title="Editar registro">
            <Edit color="primary" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                HISTÓRICO
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>DOSE</TableCell>
                    <TableCell>DATA</TableCell>
                    <TableCell>LOTE</TableCell>
                    <TableCell>UND</TableCell>
                    <TableCell align="right">RESPONSAVEL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.customerId}
                      </TableCell>
                      <TableCell>{historyRow.date}</TableCell>
                      <TableCell >{historyRow.amount}</TableCell>
                      <TableCell >
                        {historyRow.amount}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.ass}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('BCG ID', 'Tuberculose', 'Ao nascer'),
  createData('Hepatite B', 'Hepatite B', '2 meses'),
];

const VaccinationCard = ({ className, product, ...rest }) => {

  return (
    <>
      <Paper elevation={3}>
        <Card>
          <CardHeader
            title="ANTONIO MATEUS SOUSA COSTA"
            subheader="Ficha de vacinas do calendário básico"
          />
          <Divider />
          <CardContent>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="left">VACINA</TableCell>
                    <TableCell >PREVINE</TableCell>
                    <TableCell >IDADE</TableCell>
                    <TableCell align="right">EDITAR</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.name} row={row} />
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
