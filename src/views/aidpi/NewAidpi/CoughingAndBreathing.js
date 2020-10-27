import React, { useState } from 'react';
import {
  Typography, Checkbox, FormControlLabel, Grid, TextField
} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';

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

export default function CoughingAndBreathing() {
  const classes = useStyles()
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const [respiraçaoRapida, setRespiraçaoRapida] = useState(false)
  const [tiragemSubcostal, setTiragemSubcostal] = useState(false)
  const [estridor, setEstridor] = useState(false)
  const [sinalDeRisco, setSinalDeRisco] = useState(false)

  const [sibilancia, setSibilancia] = useState(false)
  const [classificacaoSibilancia, setClassificacaoSibilancia] = useState("")
  console.log(classificacaoSibilancia)

  function caseSibilancia() {
    return (
      <>
        <br />
        <Typography variant="h6" gutterBottom>
          CLASSIFICAR CRISE DE SIBILÂNCIA
      </Typography>
        <Grid item md={12} xs={12}>
          <strong>SIBILÂNCIA GRAVE:</strong><br /> <FormControlLabel
            labelPlacement="end"
            control={<Checkbox className={classes.inputText} checked={false} onChange={() => (setClassificacaoSibilancia("SIBILÂNCIA GRAVE"))} name="GRAVE" />}
            label="• Qualquer sinal geral de perigo
                • Agitada
                • Estridor em repouso
                • Fala frases incompletas (palavras isoladas); no lactente: choro curto ou não consegue chorar
                • Tiragem universal
                • Sat. O2 ≤ 90% * em ar ambiente"
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <strong>SIBILÂNCIA MODERADA:</strong><br /> <FormControlLabel
            labelPlacement="end"
            control={<Checkbox className={classes.inputText} checked={false} onChange={() => (setClassificacaoSibilancia("SIBILÂNCIA MODERADA"))} name="MODERADA" />}
            label="• Nível de consciência normal com períodos de agitação
                • Fala entrecortada ou choro entrecortado
                • Tiragem subcostal
                • Respiração rápida
                • Sat. O2
                 de 91 a 95% * em ar ambiente"
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <strong>SIBILÂNCIA LEVE:</strong><br /> <FormControlLabel
            labelPlacement="end"
            control={<Checkbox label="SIBILÂNCIA LEVE" className={false} checked={false} onChange={() => (setClassificacaoSibilancia("SIBILÂNCIA LEVE"))} name="LEVE" />}
            label="• Não há sinais suficientes para classificar como sibilância grave ou moderada
                • Sat. O2 ≥ 95% * em ar ambiente"
          />
        </Grid>
      </>
    )
  }

  return (
    <React.Fragment>
      <br />
      <Typography variant="h6" gutterBottom>
        A CRIANÇA ESTÁ COM TOSSE OU DIFICULDADE PARA RESPIRAR?<br />
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
                label="Há quanto tempo a criança está com tosse ou dificuldade para respirar?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={respiraçaoRapida} onChange={() => (setRespiraçaoRapida(!respiraçaoRapida))} name="respiraçaoRapida" />}
                label="A criança apresenta Respiração rápida?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={tiragemSubcostal} onChange={() => (setTiragemSubcostal(!tiragemSubcostal))} name="tiragemSubcostal" />}
                label="A criança apresenta Tiragem subcostal?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={estridor} onChange={() => (setEstridor(!estridor))} name="checked5" />}
                label="A criança apresenta Estridor?"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={sinalDeRisco} onChange={() => (setSinalDeRisco(!sinalDeRisco))} name="checked6" />}
                label="A criança tem sinais gerais de perigo (gemência e batimentos de asas do nariz)?"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox className={classes.inputText} checked={sibilancia} onChange={() => (setSibilancia(!sibilancia))} name="sibilancia" />}
                label="A criança apresenta sibilância?"
              />
            </Grid>
            {sibilancia === true ?
              caseSibilancia()
              :
              null}

          </FormGroup>
        </Grid>

        :
        <h5>ou avançar para proxima etapa!</h5>
      }
    </React.Fragment>
  );
}