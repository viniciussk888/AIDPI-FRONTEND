import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Grid, Typography, colors, makeStyles } from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalDiagnostics = ({ className, totalDiagnostics, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL DE DIAGNÓSTICOS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {totalDiagnostics}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
};

TotalDiagnostics.propTypes = {
  className: PropTypes.string
};

export default TotalDiagnostics;
