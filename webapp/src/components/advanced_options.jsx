//@ts-nocheck
import React from 'react';
import { IconButton, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function AdvancedOptionsCard(props) {
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
          <ExpandMoreIcon />
        </IconButton>
        <Collapse in={expanded} timeout="auto">
          {props.children}
        </Collapse>
      </div>
    );
  }