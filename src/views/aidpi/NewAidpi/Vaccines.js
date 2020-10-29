import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import VaccinesView from '../../vaccination/VaccinationView/index'

export default function Vaccines() {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Avaliar vacinas da criança
      </Typography>
      <VaccinesView />

    </React.Fragment>
  );
}