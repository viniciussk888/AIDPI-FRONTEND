import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Checkbox, FormControlLabel, Grid
} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
  },
  groupForm: {
    padding: theme.spacing(2)
  },
  inputText: {
    marginLeft: theme.spacing(1)
  }
}));

export default function SoreThroat() {
  const classes = useStyles()
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const [state] = React.useState({
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
  });

  return (
    <React.Fragment>
      <br />
      <Typography variant="h6" gutterBottom>
        A CRIANÇA ESTÁ COM  DOR DE GARGANTA?<br />
      </Typography>
      <FormControlLabel
        value={checked}
        control={<Checkbox checked={checked} onChange={handleChange} color="primary" />}
        label="SIM"
        labelPlacement="end"
      />

      {checked === true ?

        <Grid className={classes.title} container spacing={2}>
          <FormGroup className={classes.groupForm} row>
            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={state.checked3} onChange={handleChange} name="checked3" />}
                label="Apresenta presença de gânglios cervicais aumentados e dolorosos?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={state.checked3} onChange={handleChange} name="checked3" />}
                label="Presença de abaulamento de palato?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={state.checked3} onChange={handleChange} name="checked3" />}
                label="Amígdalas com membrana branco-acinzentada, que sangra quando destacada?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={state.checked3} onChange={handleChange} name="checked3" />}
                label="Amígdalas hiperemiadas com pontos purulentos ou petéquias em palato?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={state.checked3} onChange={handleChange} name="checked3" />}
                label="Presença de vesículas e/ou hiperemia de garganta?"
              />
            </Grid>

          </FormGroup>
        </Grid>

        :
        <h5>ou avançar para proxima etapa!</h5>
      }

    </React.Fragment>
  );
}