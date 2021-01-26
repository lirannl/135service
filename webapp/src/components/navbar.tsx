import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Box, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { ExpandMore } from '@material-ui/icons';
import { stateObj, useStateObj } from '../utils';

type KeyedElement = JSX.Element & { key: number | string, props: any };

function TabPanel(props: { children: typeof Tab[], value: number, index: number }) {
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabContainer: {
    flexDirection: "row-reverse"
  }
}));

const getVisibleElements = (children: { main: JSX.Element[], items: { [category: string]: JSX.Element[] } },
  category: string) => children.main.concat(children.items[category] || []);

function NavBar(props: {
  children: {
    main: JSX.Element[],
    menu: JSX.Element,
    anchorEl: stateObj<Element | null>,
    funcCategories: { func: string, category: string }[] | { unloaded: true },
    selectedCategory: stateObj<string>,
    selectedTab: stateObj<number | null>,
    items: { [category: string]: JSX.Element[] }
  }
}) {
  const classes = useStyles();
  const history = useHistory();
  const { children } = props;
  const { funcCategories, selectedTab } = children;
  const { set: categorySetter } = children.selectedCategory;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const target = getVisibleElements(children, children.selectedCategory.value)[newValue];
    if ((target.props as any).disableTouchRipple) return;
    selectedTab.set(newValue);
    history.push(`/${target.key}`);
  };

  const adjustCategory = () => {
    const currentPath = history.location.pathname.split('/')[1];
    if (Object.keys(funcCategories)[0] === "unloaded") return;
    const loadedFuncCategories = funcCategories as { func: string, category: string }[];
    const categoryToSelect = loadedFuncCategories.find(elem => elem.func === currentPath)?.category || '';
    const barElems = getVisibleElements({ main: children.main, items: children.items }, categoryToSelect);
    categorySetter(categoryToSelect);
    selectedTab.set(barElems.findIndex(e => e.key === currentPath));
  }
  useEffect(() => adjustCategory(),
    // eslint-disable-next-line
    [history, funcCategories]);

  return <div className={classes.root} style={{ position: "fixed", top: "0" }}>
    <AppBar position="static" color="default">
      {children.menu}
      <Tabs
        value={selectedTab.value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
      >
        {children.main}
        {(children.items[props.children.selectedCategory.value] || [] as unknown as { props: { label: string } }[]).sort((a, b) => {
          const patt = /[a-zA-Z]+/
          const labels = [a.props.label.match(patt)![0], b.props.label.match(patt)![0]]
          if (labels[0] > labels[1]) return 1;
          if (labels[0] === labels[1]) return 0;
          return -1;
        })}
      </Tabs>
    </AppBar>
  </div>
}

export const NavCreator = (props: { funcNames: any }): JSX.Element & { props: { children: KeyedElement[] } } => {
  const classes = useStyles();
  const anchorEl = useStateObj(null as Element | null);
  const selectedCategory = useStateObj('');
  const selectedTab = useStateObj(0 as number | null);
  const items = props.funcNames.unloaded ? {} : (props.funcNames as { func: string, category: string }[]).reduce((acc, curr) => {
    const newTab = <Tab key={curr.func} label={curr.func} />
    if (acc[curr.category])
      return Object.assign({}, acc, { [curr.category]: acc[curr.category].concat(newTab) });
    return Object.assign({}, acc, { [curr.category]: [newTab] });
  }, {} as { [category: string]: JSX.Element[] });
  const NavbarData = {
    main: [<Tab key="" label="Home" />, <Tab className={classes.tabContainer} icon={<ExpandMore />} key="menuOpener" onClick={event => {
      anchorEl.set(event.currentTarget);
    }}
      label={selectedCategory.value || "select"} disableTouchRipple />],
    menu: <Menu
      keepMounted
      anchorEl={anchorEl.value}
      open={Boolean(anchorEl.value)}
    >
      {props.funcNames.unloaded ? [] : (props.funcNames as { func: string, category: string }[])
        .reduce((categories, entry) => {
          if (categories.includes(entry.category)) return categories;
          return categories.concat(entry.category);
        }, [] as string[]).map(category => <MenuItem key={category} onClick={() => {
          if (selectedCategory.value !== category) selectedTab.set(null);
          selectedCategory.set(category);
          anchorEl.set(null);
        }}>{category}</MenuItem>)}
    </Menu>,
    funcCategories: props.funcNames as { func: string, category: string }[] | { unloaded: true },
    anchorEl,
    selectedCategory,
    selectedTab,
    items
  }
  return <NavBar {...props}>
    {NavbarData}
  </NavBar>
}