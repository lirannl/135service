import React, { useState } from 'react';
import {
  Button, ButtonGroup, TextField,
  CircularProgress,
  Select,
  MenuItem
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { BetaTag } from '../../components/beta';
import { appState } from '../../App';
import { capitalise, useStateObj } from '../../utils';
import { ReadOnlyTextField } from '../../components/resultField';
import AdvancedOptionsCard from '../../components/advanced_options';
import { sendInput } from '../../requests/requester';

function FieldWithPasteButton(props: { text: string, setText: React.Dispatch<React.SetStateAction<string>> }) {
  const Field = React.useRef(null as HTMLSpanElement | null);
  return <span ref={Field}>
    <TextField
      id="Text"
      label="Text to encrypt/decrypt"
      multiline
      rowsMax={8}
      value={props.text}
      onChange={(event) => {
        props.setText(event.target.value);
      }
      } />
    <Button style={{ marginTop: '16pt', marginLeft: '-5pt' }} tabIndex="-1" color="default" onClick={() => {
      (Field.current as any).firstChild.lastChild.firstChild.select();
      props.setText('');
    }}>Clear</Button>
  </span>
}

const Cipher = (props: { state: appState }) => {
  const { loading, classes } = props.state;
  const resLabel = useStateObj('Result');
  const factor = useStateObj('');
  const content = useStateObj('');
  const result = useStateObj('');
  const time = useStateObj('');
  const history = useHistory();
  const [base, setBase] = useState<string>("Base85");

  const baseOptions = ['Base16', 'Base32', 'Base64', 'Base85'];

  const send = async (action: string) => {
    const res = await sendInput(action, "147cipher", result, loading.set, {
      formatting: base,
      in_text: content.value,
      key: factor.value,
      ...time.value ? { in_time: parseInt(time.value) } : {}
    });
    resLabel.value = `${capitalise(action)}ed result`;
    if (res?.response.ok)
      result.value = res?.result!;
    else result.set(`${capitalise(action)}ion failed.`);
  };

  return <div className="pageContent">

    <h1 style={{ marginBottom: '-15pt' }}>147Cipher</h1>
    <p className="smallText">Symmetric Encryption Algorithm</p>
    <ButtonGroup variant="outlined" color="secondary" aria-label="contained primary button group" style={{ marginBottom: "20pt" }}>
      <Button onClick={() => history.push(`/147cipher/about`)}><span style={{marginInlineStart:"0.5ch", marginInlineEnd: "0.5ch"}}>About</span></Button>
      <Button onClick={() => window.open('https://github.com/lirannl/135code/blob/master/bin/functions/147cipher.py')}>Source</Button>
    </ButtonGroup>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={event => {
      send('encrypt');
      event.preventDefault();
    }}>
      <div>
        <TextField id="keyField" label="key" value={factor.value} onChange={(event) => {
          if (event.target.value.length > 256) alert("Key must be up to 256 characters long.");
          else
            factor.set(event.target.value);
        }} />
        <FieldWithPasteButton text={content.value} setText={content.set} />
      </div>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button onClick={() => send('encrypt')}>Encrypt</Button>
        <Button onClick={() => send('decrypt')}>Decrypt</Button>
      </ButtonGroup>
    </form>
    <BetaTag />
    <ReadOnlyTextField result={loading.value ? "Loading..." : result.value || ''} resLabel={resLabel.value} />
    <React.Fragment><br /><CircularProgress color="primary" className={loading.value ? undefined : "hidden"} /></React.Fragment>
    <AdvancedOptionsCard keepMounted>
      <TextField id="timeField" label="custom time" inputMode="numeric" value={time.value}
        onChange={event => {
          if (/^\d*$/.test(event.target.value))
            if (event.target.value.length > 80) alert("Time number must be up to 80 characters long.");
            else time.value = event.target.value;
          else alert("You must input a whole number as the time.");
        }} />
      <Select value={base} onChange={(event) => setBase(event.target.value as string)}>
        {baseOptions.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
      </Select>
    </AdvancedOptionsCard>
  </div>;
}

export default Cipher;