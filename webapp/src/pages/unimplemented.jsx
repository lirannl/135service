//@ts-nocheck
import React from 'react';
import { capitalise } from '../utils';

export default function(props) { 
    return <div className="pageContent">
      <h1>{props.customName || capitalise(props.module)} is coming soon!</h1><br/>
      <a href="/">Back to homepage</a>
      </div>}