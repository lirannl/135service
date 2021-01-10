//@ts-nocheck
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home } from './pages/home.jsx';
import { Disclaimer } from './pages/disclaimer.jsx';
import { Privacy } from './pages/privacy.jsx';
import { NotFound } from './pages/notfound.jsx';
import Unimplemented from './pages/unimplemented.jsx';

function getModule(mod, modName) { // Safely get modules based on the API's declared functions
  try {
    return require(`./pages/algorithms/${mod}`);
  }
  catch (e) {
    // Unimplemented module fallback
    return { default: (props) => <Unimplemented module={mod} customName={modName} />};
  }
}

function ModuleRoute(props) {
  const { mod, modName, ...otherProps } = props;
  if (!mod.About) return mod.default(otherProps);
  return <Switch>
    <Route path="*/about"><React.Fragment>{mod.About(otherProps)} <Link to={`/${modName}`}>Back to {modName}</Link></React.Fragment></Route>
    <Route path='/'><React.Fragment>{mod.default(otherProps)} <Link to={`/${modName}/about`}>About {modName}</Link></React.Fragment></Route>
  </Switch>
}

export function Routes(props) {
  return <Switch>
    <Route exact path="/disclaimer"><Disclaimer /></Route>
    <Route exact path="/privacy"><Privacy /></Route>
    <Route exact path="/"><Home {...props} /></Route>
    <Route path="/basetool"><Unimplemented module="" customName="BaseTool"/></Route>
    <Route path="/counttool"><Unimplemented module="" customName="CountTool"/></Route>
    {Object.entries(props.state.funcs.value).map(fname => <Route key={fname[1]} path={`/${fname[0]}`}><ModuleRoute mod={getModule(fname[0])} modName={fname[0]} {...props} /></Route>)}
    <Route path="/">{props.state.funcs.value.unloaded ? <div className="pageContent">Loading functions...</div> : <NotFound />}</Route>
  </Switch>
}