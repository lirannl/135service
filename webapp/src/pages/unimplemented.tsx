import React from 'react';
import { capitalise } from '../utils';

export const Unimplemented = (props: { customName?: string, module: string }) => <div className="pageContent">
  <h1>{props.customName || capitalise(props.module)} is coming soon!</h1><br />
  <a href="/">Back to homepage</a>
</div>;

export const UnimplementedAbout = (props: {customName?: string, module: string}) => <div className="pageContent">
  <h1>About page for {props.customName || capitalise(props.module)} coming soon!</h1><br/>
</div>