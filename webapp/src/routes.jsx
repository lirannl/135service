//@ts-nocheck
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import C135Cipher from './pages/algorithms/135cipher.jsx';
import { GlobalAbout } from './pages/about.jsx';
import { Disclaimer } from './pages/disclaimer.jsx';
import { Privacy } from './pages/privacy.jsx';
import { NotFound } from './pages/notfound.jsx';
import Unimplemented from './pages/unimplemented.jsx';

function getModule(mod) { // Safely get modules based on the API's declared functions
  try {
    return require(`./pages/algorithms/${mod}`);
  }
  catch (e) {
    // Unimplemented module fallback
    return {default: (props) => <Unimplemented module={mod}/>, About: (props) => <Unimplemented module={mod}/>};
  }
}

function ModuleRoute(props){
  const {mod, ...otherProps} = props;
  return <Switch>
      <Route path="*/about">{mod.About(otherProps)}</Route>
      <Route path='/'>{mod.default(otherProps)}</Route>
    </Switch>
}

export function Routes(props) {
  return <Switch>
  <Route exact path="/about"><GlobalAbout /></Route>
  <Route exact path="/disclaimer"><Disclaimer /></Route>
  <Route exact path="/privacy"><Privacy /></Route>
  <Route exact path="/"><C135Cipher {...props} /></Route>
  {Object.entries(props.state.funcs.value).map(fname => <Route key={fname[1]} path={`/${fname[0]}`}><ModuleRoute mod={getModule(fname[0])} {...props}/></Route>)}
  <Route path="/">{props.state.funcs.value.unloaded ? <div className="pageContent">Loading functions...</div> : <NotFound/>}</Route>
</Switch>
}