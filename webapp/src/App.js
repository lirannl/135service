// @ts-nocheck
import query from './requests/requester';
import { getFuncs } from './requests/getFuncs';
import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from './routes.jsx';
import { useEffect } from 'react';
import NavigationBar from './components/navbar.jsx';
import { capitalise } from './utils';

function sendInput(key, text, mode, algorithm, result, setLoading, setResLabel, extras) {
  if (key === '' || text === '') {
    alert(`Sorry, you must input a key and content to ${mode}.`);
    return result.value;
  }
  else {
    setLoading(true);
    setResLabel(`${capitalise(mode)}ed result`);
    query(algorithm, mode, key, text, extras).then(res => { setLoading(false); result.set(res); }).catch(e => { result.set("Failed"); setLoading(false); });
  }
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    weak: {
      main: '#62757f',
      contrastText: '#ffffff'
    }
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

const replacements = { // When a function's name is in the object's keys, replace it with its value
  '135cipher': '135Cipher',
  '512cipher': '512Cipher'
};

const useStateObj = def => {
  const [val, setVal] = useState(def);
  return { value: val, set: setVal };
}

function App() {
  const state = {
    classes: useStyles(),
    factor: useStateObj(''),
    content: useStateObj(''),
    result: useStateObj(''),
    resLabel: useStateObj("Result"),
    funcs: useStateObj({ unloaded: true }),
    loading: useStateObj(false),
    sendInput: sendInput
  }

  const setFuncs = state.funcs.set;
  useEffect(() => {
    getFuncs().then(v => {
      const val = [{}].concat(v).reduce(function (acc, curr) {
        acc[replacements[curr] || curr] = curr;
        return acc;
      });
      setFuncs(val);
    });
  }, [setFuncs]);

  return (
    <BrowserRouter basename='/'><ThemeProvider theme={theme}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <header className="App-header App">
        <NavigationBar funcNames={state.funcs.value} />
        <Routes state={state} />
        <div className="disclaimer">
          <span style={{ float: "left" }}>Disclaimer: Use at your own risk, <Link to="/disclaimer">read full disclaimer</Link>.</span>
          <span style={{ float: "right" }}> <Link to="/privacy">Privacy Policy</Link></span>
        </div>
        <div className="credits">Made by Jamal135 and Liran Piade, 2020</div>
      </header>
    </ThemeProvider></BrowserRouter>
  );
}

export default App;
