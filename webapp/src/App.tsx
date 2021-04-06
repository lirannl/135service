import React, { useEffect } from 'react';
import './App.css';
import { stateObj, useStateObj } from './utils';
import { NavCreator } from './components/navbar';
import { Routes } from './routes';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { getFuncs } from './requests/getFuncs';
import { BrowserRouter, Link } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      color: '#ffffff',
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export interface appState {
  classes: Record<"root", string>;
  funcs: stateObj<{ unloaded: true } | { func: string, category: string }[]>;
  loading: stateObj<boolean>
}

function App() {
  const state: appState = {
    classes: useStyles(),
    funcs: useStateObj({ unloaded: true } as any),
    loading: useStateObj(false as boolean)
  }

  const setFuncs = state.funcs.set;
  useEffect(() => {
    getFuncs().then(funcs => {
      setFuncs(funcs);
    });
  }, [setFuncs]);

  return (
    <BrowserRouter basename='/'><ThemeProvider theme={theme}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <header className="App-header App">
        <NavCreator funcNames={state.funcs.value} />
        <Routes state={state} />
        <div className="disclaimer">
          <span style={{ float: "left" }}> <Link to="/disclaimer">Use At Own Risk</Link></span>
          <span style={{ float: "right" }}> <Link to="/privacy">Privacy Policy</Link></span>
        </div>
        <div className="credits">Made by Jordan A. and Liran P. 2021</div>
      </header>
    </ThemeProvider></BrowserRouter>
  );
}

export default App;
