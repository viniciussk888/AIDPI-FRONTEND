import React, { useEffect, useState } from 'react';
import {
  Typography, Checkbox, FormControlLabel, Grid, TextField, Button
} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import api from 'src/services/api';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
  },
  groupForm: {
    padding: theme.spacing(2)
  },
  inputText: {
    marginLeft: theme.spacing(1)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function CoughingAndBreathing(props) {
  const classes = useStyles()

  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  const [respiraçaoRapida, setRespiraçaoRapida] = useState(false)
  const [tiragemSubcostal, setTiragemSubcostal] = useState(false)
  const [estridor, setEstridor] = useState(false)
  const [sinalDeRisco, setSinalDeRisco] = useState(false)

  const [sibilancia, setSibilancia] = useState(false)
  const [classificacaoSibilancia, setClassificacaoSibilancia] = useState("")

  const [controleSibi1, setControleSibi1] = useState(false)
  const [controleSibi2, setControleSibi2] = useState(false)
  const [controleSibi3, setControleSibi3] = useState(false)

  useEffect(() => {
    if (classificacaoSibilancia === "SIBILÂNCIA GRAVE") {
      setControleSibi1(true)
      setControleSibi2(false)
      setControleSibi3(false)
    } else if (classificacaoSibilancia === "SIBILÂNCIA MODERADA") {
      setControleSibi1(false)
      setControleSibi2(true)
      setControleSibi3(false)
    } else if (classificacaoSibilancia === "SIBILÂNCIA LEVE") {
      setControleSibi1(false)
      setControleSibi2(false)
      setControleSibi3(true)
    }
  }, [classificacaoSibilancia])

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
            control={<Checkbox checked={controleSibi1} className={classes.inputText} onChange={() => ([setClassificacaoSibilancia("SIBILÂNCIA GRAVE"), setControleSibi1(true)])} name="GRAVE" />}
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
            control={<Checkbox checked={controleSibi2} className={classes.inputText} onChange={() => (setClassificacaoSibilancia("SIBILÂNCIA MODERADA"))} name="MODERADA" />}
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
            control={<Checkbox checked={controleSibi3} className={classes.inputText} onChange={() => (setClassificacaoSibilancia("SIBILÂNCIA LEVE"))} name="LEVE" />}
            label="• Não há sinais suficientes para classificar como sibilância grave ou moderada
                • Sat. O2 ≥ 95% * em ar ambiente"
          />
        </Grid>
      </>
    )
  }

  async function enviarBack() {
    try {
      const response = await api.post(`aidpivalid`, {
        step: 2,
        respiraçaoRapida,
        tiragemSubcostal,
        estridor,
        sinalDeRisco,
        sibilancia,
        classificacaoSibilancia
      }, config)
      props.setNewDiagnosis(response.data)
      alert("Diagnóstico obtido! Prossiga ate o fim do atendimento para receber o resultado.")
    } catch (error) {
      console.log(error)
    }
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
            <div className={classes.buttons}>
              <Button
                color="primary"
                variant="contained"
                className={classes.buttons}
                onClick={enviarBack}
              >
                Obter resultado
        </Button>
            </div>

          </FormGroup>
        </Grid>
        :
        <h5>ou avançar para proxima etapa!</h5>
      }
    </React.Fragment>
  );
}