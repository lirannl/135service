import React from 'react';
import { appState } from './App'
import { Route, Switch, Link } from 'react-router-dom';
import { Home } from './pages/home';
import { Disclaimer } from './pages/disclaimer';
import { Privacy } from './pages/privacy';
import { NotFound } from './pages/notfound';
import { Unimplemented, UnimplementedAbout } from './pages/unimplemented';

const alternativeNames = {
  "135cipher": "135Cipher",
  "147cipher": "147Cipher",
  "432compress": "432Compress",
  "basetool": "BaseTool",
} as { [module: string]: string };

function getModule(mod: string, category: string, overrideUnimplementedName?: string): { default: () => JSX.Element } { // Safely get modules based on the API's declared functions
  const finalName = alternativeNames[mod] || mod;
  try {
    return require(`./pages/${category}/${finalName}`);
  }
  catch (e) {
    // Unimplemented module fallback
    return { default: () => <Unimplemented key={finalName} module={finalName} customName={overrideUnimplementedName!} /> };
  }
}

function ModuleRoute(props:
  { mod: { default: (props: any) => JSX.Element, About?: (props: any) => JSX.Element }, modName: string }) {
  const { mod, modName, ...otherProps } = props;
  const Fallback = (props: any) => <UnimplementedAbout module={modName} />;
  const About = mod.About || Fallback;
  return <Switch>
    <Route key="about" path="*/about"><React.Fragment>{<About {...otherProps} />} <Link to={`/${modName}`}>Back to {modName}</Link></React.Fragment></Route>
    <Route key="main" path='/'><React.Fragment>{mod.default(otherProps)} <Link to={`/${modName}/about`}>About {modName}</Link></React.Fragment></Route>
  </Switch>
}

export function Routes(props: { state: appState }) {
  return <Switch>
    <Route exact path="/disclaimer"><Disclaimer /></Route>
    <Route exact path="/privacy"><Privacy /></Route>
    <Route exact path="/"><Home {...props} /></Route>
    {Object.values(props.state.funcs.value).map((fname: { func: string, category: string }, index) => <Route key={`${fname.func}.${index}`} path={`/${fname.func}`}>
      <ModuleRoute mod={getModule(fname.func, fname.category)} modName={fname.func} {...props} />
    </Route>
    )}
    <Route path="/">{(props.state.funcs.value as any).unloaded ? <div className="pageContent">Loading functions...</div> : <NotFound />}</Route>
  </Switch>
}