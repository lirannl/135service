// @ts-nocheck
import React from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import AdvancedOptions from '../../components/advanced_options.jsx';
import { CircularProgress, Checkbox, FormControlLabel } from '@material-ui/core';
import { BetaTag } from '../../components/beta.jsx';

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

// Every module needs an About(props) function that returns a per-module about page
export function About(props){
  return (
    <div className="pageContent">
      About the 135cipher algorithm
    </div>
  );
}

export default function(props){
const {factor, content, result, loading, resLabel, classes, sendInput} = props.state;
const [randomPattern, setRandomPattern] = useState(false);

const send = (action) => result.set(sendInput(factor.value, content.value, action, "135cipher", result, loading.set, resLabel.set, [
  randomPattern ? '+' : '-'
]));

return <div className="pageContent">

    <h1>135Code cryptography application</h1>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={event => {
      send('encrypt'); 
      event.preventDefault();
      }}>
      <div>
      <TextField id="keyField" label="key" inputMode="numeric" value={factor.value} onChange={(event) => {
        if (event.target.value.length>135) alert("Key must be up to 135 characters long.");
        else if (RegExp("^\\d*$").test(event.target.value))
        factor.set(event.target.value);
        else alert("You can only input a whole number as the key.");
      }}/>
      <FieldWithPasteButton text={content.value} setText={content.set}/>
      </div>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button onClick={event => send('encrypt')}>Encrypt</Button>
        <Button onClick={event => send('decrypt')}>Decrypt</Button>
      </ButtonGroup>
    </form>
    <BetaTag/>
    <ReadOnlyTextField result={loading.value ? "Loading..." : result.value || ''} resLabel={resLabel.value}/>
    <React.Fragment><br/><CircularProgress color="primary" className={loading.value ? null : "hidden"} /></React.Fragment>
    <AdvancedOptions>
        <FormControlLabel
          control={
            <Checkbox value={randomPattern} onChange={event => {setRandomPattern(!randomPattern);}} />
          }
          label="Random Noise Pattern"
        />
      </AdvancedOptions>
    </div>;
}