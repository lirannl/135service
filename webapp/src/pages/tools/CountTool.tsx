import React from 'react';
import {
  Button, ButtonGroup, TextField,
  CircularProgress,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import AdvancedOptions from '../../components/advanced_options';
import { useHistory } from 'react-router-dom';
import { appState } from '../../App';
import { BetaTag } from '../../components/beta';
import { stateObj, useStateObj } from '../../utils';
import { ReadOnlyTextField } from '../../components/resultField';

const CountTool = (props: { state: appState }) => {
  const { loading, classes, sendInput } = props.state;
  const result = useStateObj('');
  const inputString = useStateObj('');
  const excludeSpaces = useStateObj(true);
  const caseSensitive = useStateObj(true);
  const history = useHistory();

  return <div className="pageContent">

    <h1 style={{ marginBottom: '-15pt' }}>CountTool</h1>
    <p className="smallText">Frequency Analysis Tool</p>
    <Button variant="outlined" color="secondary" onClick={() => history.push(`/counttool/about`)} style={{ marginBottom: "20pt" }}>About</Button>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={async (event) => {
      event.preventDefault();
      const reqArgs = {
        inputString: inputString.value,
        excludeSpaces: excludeSpaces.value,
        caseSensitive: caseSensitive.value
      };
      await sendInput("charAnalysis", "counttool", result, loading.set, () => { }, reqArgs);
    }}>
      <div>
        <TextField multiline value={inputString.value} onChange={event => inputString.value = event.target.value} label="Text to analyse"/>
      </div>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button type="submit">Analyse</Button>
      </ButtonGroup>
    </form>
    <BetaTag />
    <ReadOnlyTextField result={loading.value ? "Loading..." : result.value || ''} resLabel="Frequency output" /><br />
    <CircularProgress color="primary" className={loading.value ? undefined : "hidden"} />
    <AdvancedOptions keepMounted>
    <FormControlLabel
        control={
          <Checkbox checked={caseSensitive.value} onChange={_ => {caseSensitive.value = !caseSensitive.value}} />
        }
        label="Case Sensitive"
      />
    <FormControlLabel
        control={
          <Checkbox checked={excludeSpaces.value} onChange={_ => {excludeSpaces.value = !excludeSpaces.value}} />
        }
        label="Exclude Spaces"
      />
    </AdvancedOptions>
  </div>;
}

export default CountTool;