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

export default function Malnutrition() {
  const classes = useStyles()
  const [checked, setChecked] = useState(false);
  const [palidez, setPalidez] = useState(false);
  const [nivelDePalidez, setNivelDePalidez] = useState("LEVE");

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
        APRESENTA SINAIS DE DESNUTRIÇÃO, ANEMIA OU OBESIDADE?<br />
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
                label="Apresenta emagrecimento acentuado?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={state.checked3} onChange={handleChange} name="checked3" />}
                label="Apresenta edema em ambos os pés?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={palidez} onChange={e => setPalidez(!palidez)} name="checked3" />}
                label="Apresenta palidez palmar?"
              />
            </Grid>
            {palidez === true ?
              <TextField
                fullWidth
                label="Nivel de palidez"
                value={nivelDePalidez}
                name="nivelpalidez"
                onChange={e => setNivelDePalidez(e.target.value)}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                <option selected value="LEVE" >Palidez palmar LEVE ou Hb de 5 g/dL a 10,9 g/dL</option>
                <option value="GRAVE" >Palidez palmar GRAVE ou Hb abaixo de 5 g/dL</option>
              </TextField>
              : null}
          </FormGroup>
        </Grid>

        :
        <h5>ou avançar para proxima etapa!</h5>
      }

    </React.Fragment>
  );
}