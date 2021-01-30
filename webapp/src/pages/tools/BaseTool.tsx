import React, { MutableRefObject, useRef } from 'react';
import {
  Button, ButtonGroup, TextField,
  CircularProgress,
  Typography,
  makeStyles
} from '@material-ui/core';
import AdvancedOptions from '../../components/advanced_options';
import { useHistory } from 'react-router-dom';
import { appState } from '../../App';
import { BetaTag } from '../../components/beta';
import { stateObj, useStateObj } from '../../utils';

const useStyles = makeStyles({
  singleCharTextField: {
    width: '1ch'
  },
  smallTextField: {
    width: '15ch'
  },
  tinyTextField: {
    width: '4ch'
  }
});

function ReadOnlyTextField(props: { result: string, resLabel: string, }) {
  const OutputField = React.useRef(null as HTMLSpanElement | null);
  return <span ref={OutputField}><TextField multiline
    value={props.result}
    label={props.resLabel}
    onFocus={safeSelect}
    onClick={safeSelect}
    inputProps={{ readOnly: 'readonly' }}
    id="OutputField" /></span>
}

function InputField(props: { text: string, setText: React.Dispatch<React.SetStateAction<string>> }) {
  const Field = React.useRef(null as HTMLSpanElement | null);
  return <span ref={Field}>
    <TextField
      id="Text"
      label="Number to convert"
      value={props.text}
      onChange={(event) => {
        props.setText(event.target.value);
      }
      } />
    <TextField id="inputBase" type="number" label="Input base" />
    <TextField id="outputBase" type="number" label="Output base" />
    <Button style={{ marginTop: '16pt', marginLeft: '-5pt' }} tabIndex="-1" color="default" onClick={() => {
      (Field.current as any).firstChild.lastChild.firstChild.select();
      props.setText('');
    }}>Clear</Button>
  </span>
}

async function safeSelect(event: { target: any, preventDefault: () => void }) {
  event.preventDefault();
  if (event.target.value !== '') {
    try {
      event.target.select();
    }
    catch (ignored) { }
  }
}

// Every module needs an About(props) function that returns a per-module about page
export function About() {
  return (
    <div className="pageContent about">
    </div>
  );
}

const CharInputField = (props: { data: stateObj<string>, i: number, elemRefs: MutableRefObject<HTMLElement>[] }) => {
  const { data, i, elemRefs } = props;
  const { singleCharTextField } = useStyles();
  const ref = useRef({} as HTMLElement);
  elemRefs.push(ref);
  return <TextField
    className={singleCharTextField}
    value={data.value[i] || ''}
    onChange={(event) => {
      const targetNum = event.target.value === '' ? i : i + 2;
      const elem = elemRefs[targetNum];
      data.set(data.value.slice(undefined, i)
        .concat(event.target.value, data.value.slice(i + 1)));
    }}
  />
};

const TableRow: (props: { data: stateObj<string> | string, rowName?: string }) => JSX.Element & { props: { children: JSX.Element[] } } = ({ data, rowName }) => {
  const { singleCharTextField } = useStyles();
  const Arr = Array.from(Array(86).keys());
  const rowTitle = <td>{rowName ? <Typography>{rowName}</Typography> : null}</td>
  const elemRefs = [] as MutableRefObject<HTMLElement>[];
  if (typeof data === "string") {
    return <tr>{[rowTitle].concat(
      Arr.map(i => <td key={i}>
        <Typography className={singleCharTextField}>{data[i]}</Typography>
      </td>)
    )}</tr>
  }
  else {
    return <tr>{[rowTitle].concat(
      Arr.map(i => <td key={i}>
        <CharInputField data={data} i={i} elemRefs={elemRefs}/>
      </td>))}</tr>;
  }
}

const BaseTool = (props: { state: appState }) => {
  const { content, result, loading, resLabel, classes, sendInput } = props.state;
  const history = useHistory();
  const inputSet = useStateObj('');
  const outputSet = useStateObj('');
  const accuracy = useStateObj('');

  return <div className="pageContent">

    <h1 style={{ marginBottom: '-15pt' }}>BaseTool</h1>
    <p className="smallText">Number base conversion tool</p>
    <Button variant="outlined" color="secondary" onClick={() => history.push(`/basetool/about`)} style={{ marginBottom: "20pt" }}>About</Button>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={async (event) => {
      event.preventDefault();
      const target = event.target as unknown as { value: string }[];
      const reqArgs = {
        inputString: target[0].value,
        inBase: target[1].value,
        outBase: target[2].value || undefined,
        inputSet: inputSet.value || undefined,
        outputSet: outputSet.value || undefined,
        fracPlaces: accuracy.value || undefined
      };
      if (Object.values(reqArgs).some(e => e === '')) {
        alert("The number and input base fields cannot be left empty."); return;
      }
      const res = await sendInput("convert", "basetool", result, loading.set, () => { }, reqArgs);
      if (res?.result === "" && res.response.ok) {
        result.set("0");
      }
      else if (!res?.response.ok) {
        result.set("Base conversion failed.");
      }
    }}>
      <div>
        <InputField text={content.value} setText={content.set} />
      </div>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button type="submit">Submit</Button>
      </ButtonGroup>
    </form>
    <BetaTag />
    <ReadOnlyTextField result={loading.value ? "Loading..." : result.value || ''} resLabel={resLabel.value} />
    <React.Fragment><br /><CircularProgress color="primary" className={loading.value ? undefined : "hidden"} /></React.Fragment>
    <AdvancedOptions>
      <TextField value={accuracy.value} onChange={(event) => accuracy.set(event.target.value)} label="Fractional accuracy" />
      <table>
        <tbody>
          {TableRow({ data: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/~!@#$%^&*;=?<>[]:\"{},`" })}
          {TableRow({ data: inputSet, rowName: "Input characterset" })}
          {TableRow({ data: outputSet, rowName: "Output characterset" })}
        </tbody>
      </table>
    </AdvancedOptions>
  </div>;
}

export default BaseTool;