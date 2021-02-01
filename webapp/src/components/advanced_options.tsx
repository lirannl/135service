import React from 'react';
import { IconButton, Collapse } from "@material-ui/core";
import { ExpandMore, ExpandLess } from '@material-ui/icons';

export default function AdvancedOptionsCard(props: { children: JSX.Element | JSX.Element[], readonly keepMounted?: true }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <IconButton
        className={expanded ? "advanced_options_expanded" : "advanced_options"}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show options"
      >
        <span className="ExpandLabel">Advanced Options</span>
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
      <Collapse in={expanded} timeout="auto">
        {props.keepMounted || expanded ? props.children : null}
      </Collapse>
    </div>
  );
}