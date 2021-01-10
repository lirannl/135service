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

function NavBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const children = props.children;
  const childrenList = children.main.concat(...Object.values(children.items));
  //const children = props.children.main.concat(props.children.items.algorithms).slice(0, -1).concat(props.children.slice(-1)[0]);

  function getKey(list, value) {
    try {
      return list[value][0].key;
    }
    catch (e) {
      return list[value].key;
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`/${getKey(childrenList, newValue)}`);
  };

  useEffect(() => {
    const index = childrenList.map((_, index) => getKey(childrenList, index)).indexOf(history.location.pathname.split('/')[1])
    if (index >= 0) setValue(index);
  }, [history, childrenList]);

  return <div className={classes.root} style={{ position: "fixed", top: "0" }}>
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
        {children.main}
        {children.items.algorithms.sort((a, b) => {
          const patt = /[a-zA-Z]+/
          const labels = [a.props.label.match(patt)[0], b.props.label.match(patt)[0]]
          if (labels[0] > labels[1]) return 1;
          if (labels[0] === labels[1]) return 0;
          return -1;
        })}
      </Tabs>
    </AppBar>
  </div>
}

export default function (props) {
  return <NavBar {...props}>
    {{
      main: [<Tab key="" label="Home" {...a11yProps(0)} />, <Tab key="basetool" label="BaseTool" {...a11yProps(0)} />,
      <Tab key="counttool" label="CountTool" {...a11yProps(0)} />],
      items: {
        algorithms: Object.entries(props.funcNames)
          .filter(entry => typeof entry[1] === 'string') // Only attempt to load properties with string values
          .map(entry => <Tab key={entry[1]} label={entry[0]} {...a11yProps(Object.entries(props.funcNames).indexOf(entry) + 1)} />)
      }
    }}
  </NavBar>
}