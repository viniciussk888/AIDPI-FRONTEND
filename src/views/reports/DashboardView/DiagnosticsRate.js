import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography, makeStyles, colors } from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const DiagnosticsRate = ({ className, diagnosticsRate, ...rest }) => {
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
              TAXA DE DIAGNÓSTICOS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {diagnosticsRate}
              <Typography
                color="textPrimary"
                variant="h6"
              >Por paciente</Typography>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress
            value={diagnosticsRate}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

DiagnosticsRate.propTypes = {
  className: PropTypes.string
};

export default DiagnosticsRate;
