import React from 'react';
import { capitalise } from '../utils';

const Component = (props: { customName: string, module: string }) => <div className="pageContent">
  <h1>{props.customName || capitalise(props.module)} is coming soon!</h1><br />
  <a href="/">Back to homepage</a>
</div>;

export default Component;