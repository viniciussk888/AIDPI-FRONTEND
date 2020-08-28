import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  font: {
    fontFamily: 'Roboto'
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  boxSearch: {
    display: 'flex'
  },
  buttonSearch: {
    marginLeft: theme.spacing(2)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Card>
          <CardContent>
            <h5 className={classes.font}>Buscar pelo Nº do SUS ou CPF</h5>
            <Box maxWidth={500} className={classes.boxSearch}>
              <TextField
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
                placeholder="Buscar ficha de vacinação do paciente"
                variant="outlined"
              />
              <Button
                color="primary"
                variant="contained"
                className={classes.buttonSearch}
              >
                BUSCAR
        </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
