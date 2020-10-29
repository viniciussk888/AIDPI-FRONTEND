import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, Checkbox, FormControlLabel, Grid, TextField
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

export default function Diarrhea() {
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
        A CRIANÇA ESTÁ COM DIARREIA?<br />
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
                control={<TextField className={classes.inputText} type="number" id="outlined-basic" label="Dias" variant="outlined" />}
                label="Há quanto tempo?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={state.checked3} onChange={handleChange} name="checked3" />}
                label="Há sangue nas fezes?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={state.checked3} onChange={handleChange} name="checked3" />}
                label="A criança esta Letárgica, inconsciente, Inquieta ou irritada?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={state.checked3} onChange={handleChange} name="checked3" />}
                label="Os olhos estão fundos?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={state.checked3} onChange={handleChange} name="checked3" />}
                label="Não consegue beber ou bebe muito mal?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={state.checked3} onChange={handleChange} name="checked3" />}
                label="Bebe avidamente, com muita sede?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={state.checked3} onChange={handleChange} name="checked3" />}
                label="Sinal da prega: a pele volta muito lentamente ao estado anterior"
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