//@ts-nocheck
import React from 'react';
import { capitalise } from '../utils';
import { Link } from 'react-router-dom';

export default function(props) { 
    return <div className="pageContent">
      <h1>{capitalise(props.module)} is coming soon!</h1><br/>
      <Link to="/">Back to homepage</Link>
      </div>}