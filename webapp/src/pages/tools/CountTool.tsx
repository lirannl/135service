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
import { useStateObj } from '../../utils';
import { ReadOnlyTextField } from '../../components/resultField';
import { sendInput } from '../../requests/requester';

// Return a value to display in the result field
const displayValue = (loading: boolean, value: string): string => {
  if (loading) return "Loading...";
  if (value === "[]") return "";
  return value;
}

const CountTool = (props: { state: appState }) => {
  const { loading, classes } = props.state;
  const result = useStateObj([] as [string, number, number][]);
  const inputString = useStateObj('');
  const excludeSpaces = useStateObj(true);
  const caseSensitive = useStateObj(true);
  const history = useHistory();

  return <div className="pageContent">

    <h1 style={{ marginBottom: '-15pt' }}>CountTool</h1>
    <p className="smallText">Frequency Analysis Tool</p>
    <ButtonGroup variant="outlined" color="secondary" aria-label="contained primary button group" style={{ marginBottom: "20pt" }}>
      <Button onClick={() => history.push(`/counttool/about`)}><span style={{ marginInlineStart: "0.5ch", marginInlineEnd: "0.5ch" }}>About</span></Button>
      <Button onClick={() => window.open('https://github.com/lirannl/135code/blob/master/bin/functions/counttool.py')}>Source</Button>
    </ButtonGroup>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={async (event) => {
      event.preventDefault();
      const reqArgs = {
        input_string: inputString.value,
        exclude_spaces: excludeSpaces.value,
        case_sensitive: caseSensitive.value
      };
      await sendInput("charAnalysis", "counttool", result, loading.set, reqArgs);
    }}>
      <div>
        <TextField multiline value={inputString.value} onChange={event => inputString.value = event.target.value} label="Text to analyse" />
      </div>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button type="submit">Analyse</Button>
      </ButtonGroup>
    </form>
    <BetaTag />
    <ReadOnlyTextField result={displayValue(loading.value, JSON.stringify(result.value))} resLabel="Frequency output" /><br />
    <CircularProgress color="primary" className={loading.value ? undefined : "hidden"} />
    <AdvancedOptions keepMounted>
      <FormControlLabel
        control={
          <Checkbox checked={caseSensitive.value} onChange={_ => { caseSensitive.value = !caseSensitive.value }} />
        }
        label="Case Sensitive"
      />
      <FormControlLabel
        control={
          <Checkbox checked={excludeSpaces.value} onChange={_ => { excludeSpaces.value = !excludeSpaces.value }} />
        }
        label="Exclude Spaces"
      />
    </AdvancedOptions>
  </div>;
}

export default CountTool;