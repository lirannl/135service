//@ts-nocheck
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import C135Cipher from './pages/algorithms/135cipher.jsx';
import { GlobalAbout } from './pages/about.jsx';
import { Disclaimer } from './pages/disclaimer.jsx';
import { Privacy } from './pages/privacy.jsx';
import { NotFound } from './pages/notfound.jsx';

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

    return <Switch>
    <Route exact path="/about"><GlobalAbout /></Route>
          <Route exact path="/disclaimer"><Disclaimer /></Route>
          <Route exact path="/privacy"><Privacy /></Route>
          <Route exact path="/"><C135Cipher 
  classesp={classes} setResultp={setResult} sendInputp={sendInput} keyp={key} textp={text} setResLabelp={setResLabel}
  setKeyp={setKey} setTextp={setText} resultp={result} resLabelp={resLabel} /></Route>
          <Route path="/135cipher"><Switch>
            <Route exact path="*/about"></Route>
            <Route exact path="/"><C135Cipher 
  classesp={classes} setResultp={setResult} sendInputp={sendInput} keyp={key} textp={text} setResLabelp={setResLabel}
  setKeyp={setKey} setTextp={setText} resultp={result} resLabelp={resLabel} /></Route>
            </Switch></Route>
            <Route path="/"><NotFound/></Route>
</Switch>
}