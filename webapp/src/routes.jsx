//@ts-nocheck
import React from 'react';
import { Button } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { GlobalAbout } from './pages/about.jsx';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const aboutButton = () => {
    if (mod.About) return <Button onClick={() => history.push(`${modName}/about`)}>About 135cipher</Button>;
    else return null;
  }
  return <Switch>
    <Route path="*/about">{mod.About(otherProps)}</Route>
    <Route path='/'>{[mod.default(otherProps), aboutButton()]}</Route>
  </Switch>
}

export function Routes(props) {
  return <Switch>
    <Route exact path="/disclaimer"><Disclaimer /></Route>
    <Route exact path="/privacy"><Privacy /></Route>
    <Route exact path="/"><GlobalAbout {...props} /></Route>
    {Object.entries(props.state.funcs.value).map(fname => <Route key={fname[1]} path={`/${fname[0]}`}><ModuleRoute mod={getModule(fname[0])} modName={fname[0]} {...props} /></Route>)}
    <Route path="/">{props.state.funcs.value.unloaded ? <div className="pageContent">Loading functions...</div> : <NotFound />}</Route>
  </Switch>
}