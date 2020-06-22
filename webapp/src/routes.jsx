//@ts-nocheck
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { C135Cipher } from './pages/algorithms/135cipher.jsx';
import { GlobalAbout } from './pages/about.jsx';
import { Disclaimer } from './pages/disclaimer.jsx';
import { Privacy } from './pages/privacy.jsx';
import { NotFound } from './pages/notfound.jsx';
import { Link } from 'react-router-dom';

function getModule(module) { // Safely get modules based on the API's declared functions
  try {
    return require(`./pages/algorithms/${module}`);
  }
  catch (e) {
    return {default: () => 
    <div className="pageContent">
      <h1>{module[0].toUpperCase() + module.slice(1, module.length)} is not implemented yet</h1><br/>
      <Link to="/">Back to homepage</Link>
      </div>};
  }
}

export function Routes(props) {
    const classes = props.classesp;
    const setResult = props.setResultp;
    const sendInput = props.sendInputp;
    const key = props.keyp;
    const text = props.textp;
    const setResLabel = props.setResLabelp;
    const setKey = props.setKeyp;
    const setText = props.setTextp;
    const result = props.resultp;
    const resLabel = props.resLabelp;
    const funcNames = props.funcsp;

    return <Switch>
    <Route exact path="/about"><GlobalAbout /></Route>
    <Route exact path="/disclaimer"><Disclaimer /></Route>
    <Route exact path="/privacy"><Privacy /></Route>
    <Route exact path="/"><C135Cipher 
  classesp={classes} setResultp={setResult} sendInputp={sendInput} keyp={key} textp={text} setResLabelp={setResLabel}
  setKeyp={setKey} setTextp={setText} resultp={result} resLabelp={resLabel} /></Route>
    {Object.entries(funcNames).map(fname => <Route key={fname[1]} path={`/${fname[0]}`}>{getModule(fname[0]) // For each path
    .default(classes, setResult, sendInput, key, text, setResLabel, setKey, setText, result, resLabel)}</Route>) /* Call the default function of the module */} 
    <Route path="/"><NotFound/></Route>
</Switch>
}