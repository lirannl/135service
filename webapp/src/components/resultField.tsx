import { Button, TextField } from '@material-ui/core';
import React from 'react';

async function safeSelect(event: { target: any, preventDefault: () => void }) {
    event.preventDefault();
    if (event.target.value !== '') {
      try {
        event.target.select();
      }
      catch (ignored) { }
    }
  }

export function ReadOnlyTextField(props: { result: string, resLabel: string, }) {
    const OutputField = React.useRef(null as HTMLSpanElement | null);
    return <span ref={OutputField}><TextField multiline
        value={props.result}
        label={props.resLabel}
        onFocus={safeSelect}
        onClick={safeSelect}
        inputProps={{ readOnly: 'readonly' }}
        id="OutputField" /><Button style={{ marginTop: '10pt' }} color="default" onClick={() => {
            (OutputField as any).current.firstChild.lastChild.firstChild.select();
            document.execCommand("Copy");
        }}>Copy to clipboard</Button></span>
}