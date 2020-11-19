import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
  },
  groupForm: {
    padding: theme.spacing(2)
  }
}));

export default function RiskSigns() {
  const classes = useStyles()

  const [state, setState] = React.useState({
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false
  });

  const [risks] = useState([])

  function saveRisks(risk, selected) {
    if (selected === true) {
      if (risks.includes(risk)) {
        return
      }
      risks.push(risk)
    }
    if (selected === false) {
      risks.pop(risk)
    }
    localStorage.setItem("risk", JSON.stringify(risks))
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    saveRisks(event.target.value, event.target.checked)
  };

  return (
    <React.Fragment>
      <br />
      <Typography variant="h6" gutterBottom>
        VERIFICAR SE HÁ SINAIS GERAIS DE PERIGO
      </Typography>
      <Grid className={classes.title} container spacing={3}>
        <FormGroup className={classes.groupForm} row>
          <Grid item md={4} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={state.checked1} onChange={handleChange} name="checked1" />}
              label="1. NÃO CONSEGUE BEBER OU MAMAR NO PEITO" value="NÃO CONSEGUE BEBER OU MAMAR NO PEITO"
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={state.checked2} onChange={handleChange} name="checked2" />}
              label="2. LETÁRGICA OU INCONSCIENTE" value="LETÁRGICA OU INCONSCIENTE"
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={state.checked3} onChange={handleChange} name="checked3" />}
              label="3. BATIMENTOS DE ASAS DO NARIZ/GEMENCIA" value="BATIMENTOS DE ASAS DO NARIZ/GEMENCIA"
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={state.checked4} onChange={handleChange} name="checked4" />}
              label="4. TEMPO DE ENCHIMENTO CAPILAR  > 2 segundos" value="TEMPO DE ENCHIMENTO CAPILAR  > 2 segundos"
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={state.checked5} onChange={handleChange} name="checked5" />}
              label="5. CONVULSÕES/MOV. ANORMAIS" value="CONVULSÕES/MOV. ANORMAIS"
            />
          </Grid>

          <Grid item md={4} xs={12}>
            <FormControlLabel
              control={<Checkbox checked={state.checked6} onChange={handleChange} name="checked6" />}
              label="6. VOMITA TUDO" value="VOMITA TUDO"
            />
          </Grid>

        </FormGroup>
      </Grid>
    </React.Fragment>
  );
}