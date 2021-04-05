import React from 'react';
import {
  Button, ButtonGroup, TextField,
  CircularProgress
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { BetaTag } from '../../components/beta';
import { appState } from '../../App';
import { capitalise, useStateObj } from '../../utils';
import { ReadOnlyTextField } from '../../components/resultField';
import AdvancedOptionsCard from '../../components/advanced_options';

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
  const { loading, classes, sendInput } = props.state;
  const resLabel = useStateObj('Result');
  const factor = useStateObj('');
  const content = useStateObj('');
  const result = useStateObj('');
  const time = useStateObj(NaN);
  const history = useHistory();

  const send = async (action: string) => {
    const res = await sendInput(action, "147cipher", result, loading.set, resLabel.set, {
      inText: content.value,
      key: factor.value,
      ...isNaN(time.value) ? {} : { inTime: time.value }
    });
    if (res?.response.ok)
      result.set(res?.result!);
    else result.set(`${capitalise(action)}ion failed.`);
  };

  return <div className="pageContent">

    <h1 style={{ marginBottom: '-15pt' }}>147Cipher</h1>
    <p className="smallText">Symmetric Encryption Algorithm</p>
    <ButtonGroup variant="outlined" color="secondary" aria-label="contained primary button group" style={{ marginBottom: "20pt" }}>
      <Button onClick={() => history.push(`/147cipher/about`)}><span style={{marginInlineEnd:"1ch"}}>About</span></Button>
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
      <TextField id="timeField" label="custom time" inputMode="numeric" value={`${isNaN(time.value) ? `` : time.value}`}
        onChange={event => {
          if (/^\d*$/.test(event.target.value))
            time.value = parseInt(event.target.value);
          else alert("You must input a whole number as the time.")
        }} />
    </AdvancedOptionsCard>
  </div>;
}

export default Cipher;