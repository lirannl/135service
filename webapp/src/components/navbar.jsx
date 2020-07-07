//@ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));

  function NavBar(props){
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = React.useState(0);
    const children = props.children.slice(0, -1).concat(props.children.slice(-1)[0])
  
    function getKey(children, value){
      try {
        return children[value][0].key;
      }
      catch(e){
        return children[value].key;
      }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        history.push(`/${getKey(children, newValue)}`);
    };

    useEffect(() => {
      const index = children.map((_, index) => getKey(children, index)).indexOf(history.location.pathname.split('/')[1])
      if (index >= 0) setValue(index);
    }, [history, children]);
  
    return <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            {props.children}
          </Tabs>
        </AppBar>
      </div>
  }
  
export default function(props) {
    return <NavBar {...props}>
        <Tab key="" label="Home" {...a11yProps(0)} />
        <Tab key="about" label="About" {...a11yProps(0)} />
        {Object.entries(props.funcNames)
      .filter(entry => typeof entry[1] === 'string') // Only attempt to load properties with string values
      .map(entry => <Tab key={entry[1]} label={entry[0]} {...a11yProps(Object.entries(props.funcNames).indexOf(entry)+1)}/>)}
    </NavBar>
  }