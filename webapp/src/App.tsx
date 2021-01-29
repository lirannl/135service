import React, { useEffect } from 'react';
import query from './requests/requester';
import './App.css';
import { capitalise, stateObj, useStateObj } from './utils';
import { NavCreator } from './components/navbar';
import { Routes } from './routes';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { getFuncs } from './requests/getFuncs';
import { BrowserRouter, Link } from 'react-router-dom';

function sendInput(key: string, text: string, mode: string, algorithm: string,
  result: stateObj<string>, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setResLabel: React.Dispatch<React.SetStateAction<string>>, extras: string[]) {
  if (key === '' || text === '') {
    alert(`Sorry, you must input a key and content to ${mode}.`);
    return result.value;
  }
  else {
    setLoading(true);
    setResLabel(`${capitalise(mode)}ed result`);
    query(algorithm, mode, key, text, extras).then(res => {
      setLoading(false);
      result.set(res);
    }).catch(e => {
      result.set("Failed");
      setLoading(false);
    });
  }
}

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
  factor: stateObj<string>;
  content: stateObj<string>;
  result: stateObj<string>;
  resLabel: stateObj<string>;
  funcs: stateObj<{ unloaded: true } | { func: string, category: string }[]>;
  loading: stateObj<boolean>
  sendInput: (key: string, text: string, mode: string, algorithm: string,
    result: stateObj<string>, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setResLabel: React.Dispatch<React.SetStateAction<string>>, extras: string[]) => string | undefined;
}

function App() {
  const state: appState = {
    classes: useStyles(),
    factor: useStateObj(''),
    content: useStateObj(''),
    result: useStateObj(''),
    resLabel: useStateObj("Result"),
    funcs: useStateObj({ unloaded: true } as any),
    loading: useStateObj(false as boolean),
    sendInput: sendInput
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
          <span style={{ float: "left" }}>Disclaimer: Use at your own risk, <Link to="/disclaimer">read full disclaimer</Link>.</span>
          <span style={{ float: "right" }}> <Link to="/privacy">Privacy Policy</Link></span>
        </div>
        <div className="credits">Made by Jordan Amalfitano and Liran Piade, 2021</div>
      </header>
    </ThemeProvider></BrowserRouter>
  );
}

export default App;
