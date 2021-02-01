import React from 'react';
import {
  Button, ButtonGroup, TextField,
  CircularProgress,
  Typography, Slider
} from '@material-ui/core';
import AdvancedOptions from '../../components/advanced_options';
import { useHistory } from 'react-router-dom';
import { appState } from '../../App';
import { BetaTag } from '../../components/beta';
import { stateObj, useStateObj } from '../../utils';
import { TabularStringInput } from '../../components/tabularStringInput';
import { ReadOnlyTextField } from '../../components/resultField';

const NumBaseSlider = (props: { value: stateObj<number>, readonly max: number, readonly label: string }) => <div style={{ display: 'inline-flex' }}>
  <Typography style={{ paddingInline: '2ch' }}>{props.label}</Typography><Slider
    style={{ width: '15vw' }}
    valueLabelDisplay='on' defaultValue={10}
    step={1} min={2} max={props.max} onChangeCommitted={(_, value) => {
      props.value.value = value as number;
    }} />
</div>

function InputField(props: { value: stateObj<string>, inBase: stateObj<number>, outBase: stateObj<number> }) {
  return <div>
    <NumBaseSlider max={86} value={props.inBase} label="Input base" />
    <NumBaseSlider max={86} value={props.outBase} label="Output base" />
    <br /><TextField
      label="Number to convert"
      value={props.value.value}
      onChange={(event) => {
        props.value.value = event.target.value;
      }
      } />
    <Button style={{ marginTop: '16pt', marginLeft: '-5pt' }} tabIndex="-1" color="default" onClick={() => {
      props.value.value = '';
    }}>Clear</Button>
  </div>
}

// Every module needs an About(props) function that returns a per-module about page
export function About() {
  return (
    <div className="pageContent about">
    </div>
  );
}

const defaultCharSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/~!@#$%^&*;=?<>[]:"{},`';

const TableHeaderCell = (props: { children?: string }) => <Typography
  className='scrollableTableHeader'
  style={{ paddingInlineEnd: '1ch', display: 'table-cell' }}>
  {props.children || ''}
</Typography>

const Row = (props: { label: string, value: stateObj<string> }) => <div style={{ display: "table-row" }}>
  <TableHeaderCell>{props.label}</TableHeaderCell>
  <TabularStringInput maxLength={86} value={props.value} />
</div>

const BaseTool = (props: { state: appState }) => {
  const { loading, classes, sendInput } = props.state;
  const result = useStateObj('');
  const numberStr = useStateObj('');
  const history = useHistory();
  const inBase = useStateObj(10);
  const outBase = useStateObj(10);
  const inputSet = useStateObj(defaultCharSet);
  const outputSet = useStateObj(defaultCharSet);
  const accuracy = useStateObj('');

  return <div className="pageContent">

    <h1 style={{ marginBottom: '-15pt' }}>BaseTool</h1>
    <p className="smallText">Number base conversion tool</p>
    <Button variant="outlined" color="secondary" onClick={() => history.push(`/basetool/about`)} style={{ marginBottom: "20pt" }}>About</Button>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={async (event) => {
      event.preventDefault();
      const reqArgs = {
        inputString: numberStr.value,
        inBase: inBase.value,
        outBase: outBase.value,
        inputSet: inputSet.value || undefined,
        outputSet: outputSet.value || undefined,
        fracPlaces: accuracy.value || undefined
      };
      if (Object.values(reqArgs).some(e => e === '')) {
        alert("The number and input base fields cannot be left empty."); return;
      }
      const res = await sendInput("convert", "basetool", result, loading.set, () => { }, reqArgs);
      if (res?.result === "" && res.response.ok) {
        result.value = "0";
      }
      else if (!res?.response.ok) {
        result.value = "Base conversion failed.";
      }
    }}>
      <div>
        <InputField value={numberStr} inBase={inBase} outBase={outBase} />
      </div>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button type="submit">Convert</Button>
      </ButtonGroup>
    </form>
    <BetaTag />
    <ReadOnlyTextField result={loading.value ? "Loading..." : result.value || ''} resLabel="Converted number" /><br />
    <CircularProgress color="primary" className={loading.value ? undefined : "hidden"} />
    <AdvancedOptions>
      <div style={{ display: 'inline-flex' }}>
        <Typography style={{ paddingInlineEnd: '2ch' }}>Fractional Places</Typography><Slider
          style={{ width: '20vw' }}
          valueLabelDisplay='on' defaultValue={5}
          step={1} min={0} max={7} onChangeCommitted={(_, value) => {
            accuracy.value = `${value}`;
          }} />
      </div>
      <div className="flexBox">
        <div className="scrollableTable">
          <div style={{ display: 'table-row' }}>
            <TableHeaderCell />
            {Array.from(Array(86).keys()).map(i => <Typography key={i}
              style={{ display: 'table-cell', paddingInline: '1pt' }}>
              {i}
            </Typography>)}
          </div>
          <Row label="Input Characterset" value={inputSet} />
          <Row label="Output Characterset" value={outputSet} />
        </div>
      </div>
    </AdvancedOptions>
  </div>;
}

export default BaseTool;