//@ts-nocheck
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home } from './pages/home.jsx';
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
    return { default: (props) => <Unimplemented module={mod} />, About: (props) => <Unimplemented module={mod} /> };
  }
}

function ModuleRoute(props) {
  const { mod, modName, ...otherProps } = props;
  return <Switch>
    <Route path="*/about">{[mod.About(otherProps), <Link to={`/${modName}`}>Back to {modName}</Link>]}</Route>
    <Route path='/'>{[mod.default(otherProps), <Link to={`/${modName}/about`}>About {modName}</Link>]}</Route>
  </Switch>
}

export function Routes(props) {
  return <Switch>
    <Route exact path="/disclaimer"><Disclaimer /></Route>
    <Route exact path="/privacy"><Privacy /></Route>
    <Route exact path="/"><Home {...props} /></Route>
    {Object.entries(props.state.funcs.value).map(fname => <Route key={fname[1]} path={`/${fname[0]}`}><ModuleRoute mod={getModule(fname[0])} modName={fname[0]} {...props} /></Route>)}
    <Route path="/">{props.state.funcs.value.unloaded ? <div className="pageContent">Loading functions...</div> : <NotFound />}</Route>
  </Switch>
}