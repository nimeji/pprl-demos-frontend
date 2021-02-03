import {
  AppBar,
  Container,
  Drawer, List,
  makeStyles,
  Typography,
  Toolbar,
} from '@material-ui/core';
import React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';
import PPIRLDemo from './Components/PPIRLDemo/PPIRLDemo';
import BloomFilterDemo from './Components/BloomFilterDemo/BloomFilterDemo';
import ListItemLink from './Components/ListItemLink';
import ContentWrapper from './Components/ContentWrapper';
import OnlineStatusIcon from './Components/OnlineStatusIcon';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: drawerWidth,
    left: 0,
    right: 'auto',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  contentContainer: {
    marginLeft: drawerWidth,
    padding: 0,
    maxWidth: '100%',
    width: 'auto',
    height: '100%',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            PPRL Demonstrationen
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div className={classes.drawerContainer}>
          <Toolbar />
          <List>
            <ListItemLink to="/" primary="Home" />
            <ListItemLink to="/ppirl" primary="PPIRL" icon={<OnlineStatusIcon url={process.env.REACT_APP_PPIRL_API} />} />
            <ListItemLink to="/bloom" primary="Bloom Filter" icon={<OnlineStatusIcon url={process.env.REACT_APP_BLOOMFILTER_API} />} />
          </List>
        </div>
      </Drawer>
      <Container className={classes.contentContainer}>

        <ContentWrapper path="/">
          Hier sind PPRL Demonstrationen
        </ContentWrapper>

        <ContentWrapper path="/ppirl">
          <PPIRLDemo />
        </ContentWrapper>

        <ContentWrapper path="/bloom">
          <BloomFilterDemo />
        </ContentWrapper>

      </Container>
    </BrowserRouter>

  );
}
