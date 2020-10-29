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

export default function EarProblem() {
  const classes = useStyles()
  const [checked, setChecked] = useState(false);
  const [dias, setDias] = useState("");
  const [secrecao, setSecrecao] = useState(false);

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
        A CRIANÇA ESTÁ COM ALGUM PROBLEMA DE OUVIDO?<br />
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
                label="Está com dor de ouvido?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={secrecao} onChange={e => { setSecrecao(!secrecao) }} name="checked3" />}
                label="Há secreção no ouvido?"
              />
            </Grid>
            {secrecao === true ?
              <>
                <Grid item md={12} xs={12}>
                  <FormControlLabel
                    labelPlacement="start"
                    control={<TextField className={classes.inputText} onChange={e => setDias(e.target.value)} value={dias} type="number" id="outlined-basic" label="Dias" variant="outlined" />}
                    label="Há quanto tempo há secreção?"
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormControlLabel
                    labelPlacement="start"
                    control={<Checkbox className={classes.inputText} checked={secrecao} onChange={e => { setSecrecao(!secrecao) }} name="checked3" />}
                    label="Apresenta secreção purulenta no ouvido?"
                  />
                </Grid>
              </>
              :
              null}


            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={secrecao} onChange={e => { setSecrecao(!secrecao) }} name="checked3" />}
                label="Apresenta tumefação e/ou vermelhidão dolorosa ao toque atrás da orelha?"
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