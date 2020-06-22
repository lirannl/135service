// @ts-nocheck
import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import { BetaTag } from '../../components/beta.jsx';
import { Switch, Route } from 'react-router-dom';

function ReadOnlyTextField(props) {
  const OutputField = React.useRef(null);
  return <span ref={OutputField}><TextField noValidate multiline 
  value={props.result} 
  label={props.resLabel}
  onFocus={safeSelect}
  onClick={safeSelect}
  inputProps={{ readOnly: 'readonly'}}
id="OutputField"/><Button style={{marginTop:'10pt'}} color="default" onClick={() => {
  OutputField.current.firstChild.lastChild.firstChild.select();
  document.execCommand("Copy");
}}>Copy to clipboard</Button></span>
}

function FieldWithPasteButton(props) {
  const Field = React.useRef(null);
  return <span ref={Field}>
    <TextField
    id="Text"
    label="Text to encrypt/decrypt"
    multiline
    rowsMax={8}
    value={props.text}
    onChange={(event) => {
      // eslint-disable-next-line
      //if (!RegExp("^[\x20-\x7F\x09\x0A]*$").test(event.target.value)) alert("You may only enter printable ascii characters here.");
      //else 
      props.setText(event.target.value);
    }
    }/>
    <Button style={{marginTop:'16pt', marginLeft:'-5pt'}} tabIndex="-1" color="default" onClick={() => {
      Field.current.firstChild.lastChild.firstChild.select();
      props.setText('');
    }}>Clear</Button>
  </span>
}

async function safeSelect(event){
  event.preventDefault();
  if (event.target.value !== '')
  {
    try {
    event.target.select();
    }
  catch(ignored){}
  }
}

// Every algorithm's frontend module must have a default export for handling its' path
export default function(classes, setResult, sendInput, key, text, setResLabel, setKey, setText, result, resLabel) {
  return <Switch>
    <Route path="*/about"><div className="">About the 135cipher algorithm</div></Route>
    <Route path="/"><C135Cipher classesp={classes} setResultp={setResult} sendInputp={sendInput} keyp={key} textp={text} setResLabelp={setResLabel}
  setKeyp={setKey} setTextp={setText} resultp={result} resLabelp={resLabel}/></Route>
  </Switch>
}

export function C135Cipher(props){
const classes = props.classesp;
const setResult = props.setResultp;
const sendInput = props.sendInputp;
const key = props.keyp;
const text = props.textp;
const setResLabel = props.setResLabelp;
const setKey = props.setKeyp;
const setText = props.setTextp;
const result = props.resultp;
const resLabel = props.resLabelp;

return <div className="pageContent">
    <h1>135Code cryptography application</h1>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={event => {setResult(sendInput(key, text, true, result, setResult, setResLabel)); event.preventDefault();}}>
      <div>
      <TextField id="keyField" label="key" inputMode="numeric" value={key} onChange={(event) => {
        if (event.target.value.length>135) alert("Key must be up to 135 characters long.");
        else if (RegExp("^\\d*$").test(event.target.value))
        setKey(event.target.value);
        else alert("You can only input a whole number as the key.");
      }}/>
      <FieldWithPasteButton text={text} setText={setText}/>
      </div>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button onClick={event => {setResult(sendInput(key, text, true, result, setResult, setResLabel));}}>Encrypt</Button>
        <Button onClick={event => {setResult(sendInput(key, text, false, result, setResult, setResLabel));}}>Decrypt</Button>
      </ButtonGroup>
    </form>
    <BetaTag/>
    <ReadOnlyTextField result={result} resLabel={resLabel}/>
    </div>;
}