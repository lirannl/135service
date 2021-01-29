import React from 'react';
import { IconButton, Collapse } from "@material-ui/core";
import { ExpandMore } from '@material-ui/icons';

export default function AdvancedOptionsCard(props: { children: any }) {
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
        <ExpandMore />
      </IconButton>
      <Collapse in={expanded} timeout="auto">
        {props.children}
      </Collapse>
    </div>
  );
}