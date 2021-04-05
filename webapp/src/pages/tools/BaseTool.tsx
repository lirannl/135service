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

function InputField(props: { value: stateObj<string>, inBase: stateObj<number>, outBase: stateObj<number> }) {
  return <div style={{ display: 'inline-block' }}>
    <TextField style={{ width: '8ch' }}
      type="number" label="Input Base"
      value={`${props.inBase.value}`} onChange={(event) => { props.inBase.value = parseInt(event.target.value) }} />
    <TextField style={{ width: '8ch' }}
      type="number" label="Output Base"
      value={`${props.outBase.value}`} onChange={(event) => { props.outBase.value = parseInt(event.target.value) }} />
    <br />
    <TextField
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
  const outBase = useStateObj(16);
  const inputSet = useStateObj(defaultCharSet);
  const outputSet = useStateObj(defaultCharSet);
  const accuracy = useStateObj('');

  return <div className="pageContent">

    <h1 style={{ marginBottom: '-15pt' }}>BaseTool</h1>
    <p className="smallText">Number Base Conversion Tool</p>
    <ButtonGroup variant="outlined" color="secondary" aria-label="contained primary button group" style={{ marginBottom: "20pt" }}>
      <Button onClick={() => history.push(`/basetool/about`)}><span style={{marginInlineStart:"0.5ch", marginInlineEnd: "0.5ch"}}>About</span></Button>
      <Button onClick={() => window.open('https://github.com/lirannl/135code/blob/master/bin/functions/basetool.py')}>Source</Button>
    </ButtonGroup>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={async (event) => {
      event.preventDefault();
      const reqArgs = {
        inputString: numberStr.value,
        inBase: inBase.value,
        outBase: outBase.value || undefined,
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
      <div style={{ display: 'inline-flex', paddingBottom: '12pt' }}>
        <Typography style={{ paddingInlineEnd: '2ch' }}>Fractional Places: {accuracy.value}</Typography><Slider
          style={{ width: '20vw' }}
          valueLabelDisplay='auto' defaultValue={5}
          step={1} min={0} max={7} onChangeCommitted={(_, value) => {
            accuracy.value = `${value}`;
          }} />
      </div>
      <div className="flexBox">
        <div className="scrollableTable">
          <div style={{ display: 'table-row' }}>
            <TableHeaderCell>Value</TableHeaderCell>
            {Array.from(Array(86).keys()).map(i => <Typography key={i}
              style={{ display: 'table-cell', paddingInline: '1pt', borderInline: 'solid 1px #afafaf' }}>
              {i}
            </Typography>)}
          </div>
          <Row label="Input Set" value={inputSet} />
          <Row label="Output Set" value={outputSet} />
        </div>
      </div>
    </AdvancedOptions>
  </div>;
}

export default BaseTool;