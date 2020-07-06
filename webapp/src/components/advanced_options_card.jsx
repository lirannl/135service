//@ts-nocheck
import React from 'react';
import { Card, CardHeader, CardContent, IconButton, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function AdvancedOptionsCard(props) {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    return (
      <Card className="Advanced_Options_Card">
        <CardHeader
          action={
            <IconButton
            className={expanded ? "advanced_options_expanded" : "advanced_options"}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show options"
          >
              <ExpandMoreIcon />
            </IconButton>
          }
          title="Advanced Options"
          subheader="Show advanced options for this algorithm"
        />
        <Collapse in={expanded} timeout="auto">
          <CardContent>
          {props.children}
          </CardContent>
        </Collapse>
      </Card>
    );
  }