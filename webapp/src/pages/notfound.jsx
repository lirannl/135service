// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
export function NotFound(props) {
    return <div className="pageContent">
        <h1>Page not found</h1><br/>
        <Link to="/" >Return to homepage</Link>
    </div>
}