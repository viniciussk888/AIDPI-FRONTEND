import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import TotalDiagnostics from './TotalDiagnostics';
import Graphic from './Graphic';
import DiagnosticsRate from './DiagnosticsRate';
import TotalPatients from './TotalPatients';
import { useSelector } from 'react-redux';
import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [totalPatients, setTotalPatients] = useState(0)
  const [totalDiagnostics] = useState(10)
  const [diagnosticsRate, setDiagnosticsRate] = useState(0)

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await api.get('dashboard', config)
        console.log()
        setTotalPatients(response.data[0].totalPatients)
        setDiagnosticsRate(totalDiagnostics / totalPatients)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDashboard()
  }, [config, totalPatients, totalDiagnostics, diagnosticsRate])

  return (
    <Page
      className={classes.root}
      title="Início"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
            <TotalDiagnostics totalDiagnostics={totalDiagnostics} />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
            <TotalPatients totalPatients={totalPatients} />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
            <DiagnosticsRate diagnosticsRate={diagnosticsRate} />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <Graphic />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
