import React, { useEffect } from 'react';
import query from './requests/requester';
import './App.css';
import { capitalise, stateObj, useStateObj } from './utils';
import { NavCreator } from './components/navbar';
import { Routes } from './routes';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { getFuncs } from './requests/getFuncs';
import { BrowserRouter, Link } from 'react-router-dom';

async function sendInput(func: string, algorithm: string,
  result: stateObj<string>, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setResLabel: React.Dispatch<React.SetStateAction<string>>, args: Object) {
  setLoading(true);
  setResLabel(`${capitalise(func)}ed result`);
  try {
    const res = await query(algorithm, func, args);
    setLoading(false);
    result.set(res.result);
    return res as { response: Response, result: any };
  }
  catch (e) {
    result.set("Failed");
    setLoading(false);
    return;
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
  funcs: stateObj<{ unloaded: true } | { func: string, category: string }[]>;
  loading: stateObj<boolean>
  sendInput: (mode: string, algorithm: string,
    result: stateObj<string>, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setResLabel: React.Dispatch<React.SetStateAction<string>>, args: Object) =>
    Promise<{ result: string | undefined, response: Response } | undefined>;
}

function App() {
  const state: appState = {
    classes: useStyles(),
    funcs: useStateObj({ unloaded: true } as any),
    loading: useStateObj(false as boolean),
    sendInput
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
        <div className="credits">Made by Jordan Amalfitano and Liran Piade, 2021</div>
      </header>
    </ThemeProvider></BrowserRouter>
  );
}

export default App;
