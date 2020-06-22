//@ts-nocheck
import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useHistory } from 'react-router-dom';
export function NavigationBar(props) {
    const history = useHistory();
    return <ButtonGroup className="navbar" variant="contained" color="secondary">
        <Button onClick={() => {history.push('/');}}>Homepage</Button>
        {Object.entries(props.funcNames)
        .filter(entry => typeof entry[1] === 'string') // Only attempt to load properties with string values
        .map(entry => <Button key={entry[1]} onClick={() => history.push(`/${entry[0]}`)}>{entry[0]}</Button>)}
    </ButtonGroup>
}