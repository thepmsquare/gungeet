import React, { Component } from "react";
import firebase from "./Firebase";
import clsx from "clsx";
import {
  CssBaseline,
  Drawer,
  Button,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
  Typography,
  ListItem,
  List,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExpandLess from "@material-ui/icons/ChevronLeft";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import "./stylesheets/Home.css";
import CreateOPD from "./CreateOPD";
import CreateIPD from "./CreateIPD";
import CreateDischargeCard from "./CreateDischargeCard";
import EditDischargeCard from "./EditDischargeCard";
import EditOPD from "./EditOPD";
import ViewOPD from "./ViewOPD";
import ViewIPD from "./ViewIPD";
import PrintHistory from "./PrintHistory";
import CreateIndoorRegister from "./CreateIndoorRegister";
import EditIndoorRegister from "./EditIndoorRegister";
import EditIPD from "./EditIPD";
import { isBrowser } from "react-device-detect";

const drawerWidth = 240;
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: isBrowser,
      selectedListItem: "New OPD Bill",
      isExpanded: {
        OPD: true,
        IPD: true,
        Tools: true,
      },
    };
  }
  handleDrawerOpen = () => {
    this.setState(() => {
      return { isDrawerOpen: true };
    });
  };
  handleDrawerClose = () => {
    this.setState(() => {
      return { isDrawerOpen: false };
    });
  };
  handleUserLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.handleUserLogout();
      });
  };
  handleListItemSelect = (selectedListItem) => {
    this.setState(
      () => {
        return { selectedListItem };
      },
      () => {
        if (!isBrowser) {
          this.handleDrawerClose();
        }
      }
    );
  };
  handleExpandToggle = (item) => {
    this.setState((curState) => {
      const curStateCopy = { ...curState };
      curStateCopy.isExpanded[item] = !curStateCopy.isExpanded[item];
      return {
        isExpanded: { ...curStateCopy.isExpanded },
      };
    });
  };
  render = () => {
    const { classes } = this.props;
    return (
      <div className="Home">
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.isDrawerOpen,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(
                classes.menuButton,
                this.state.isDrawerOpen && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              Gun-Geet Hospital & Polyclinic
            </Typography>
            <Button onClick={this.handleUserLogout} style={{ color: "white" }}>
              Log out
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.isDrawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <List>
            <ListItem
              button
              key="OPD"
              onClick={() => this.handleExpandToggle("OPD")}
            >
              <ListItemText primary="OPD" />
              {this.state.isExpanded.OPD ? <ExpandMore /> : <ExpandLess />}
            </ListItem>
            <Collapse
              in={this.state.isExpanded.OPD}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {["New OPD Bill", "View OPD Bill", "Edit OPD Bill"].map(
                  (text, index) => (
                    <ListItem
                      key={text}
                      button
                      selected={this.state.selectedListItem === text}
                      onClick={() => this.handleListItemSelect(text)}
                    >
                      <ListItemText primary={text} />
                    </ListItem>
                  )
                )}
              </List>
            </Collapse>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              key="IPD"
              onClick={() => this.handleExpandToggle("IPD")}
            >
              <ListItemText primary="IPD" />
              {this.state.isExpanded.IPD ? <ExpandMore /> : <ExpandLess />}
            </ListItem>
            <Collapse
              in={this.state.isExpanded.IPD}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {["New IPD Bill", "View IPD Bill", "Edit IPD Bill"].map(
                  (text, index) => (
                    <ListItem
                      key={text}
                      button
                      selected={this.state.selectedListItem === text}
                      onClick={() => this.handleListItemSelect(text)}
                    >
                      <ListItemText primary={text} />
                    </ListItem>
                  )
                )}
              </List>
            </Collapse>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              key="Tools"
              onClick={() => this.handleExpandToggle("Tools")}
            >
              <ListItemText primary="Tools" />
              {this.state.isExpanded.Tools ? <ExpandMore /> : <ExpandLess />}
            </ListItem>
            <Collapse
              in={this.state.isExpanded.Tools}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {[
                  "New Indoor Register",
                  "Edit Indoor Register",
                  "New Discharge Card",
                  "Edit Discharge Card",
                  "Print History",
                ].map((text, index) => (
                  <ListItem
                    key={text}
                    button
                    selected={this.state.selectedListItem === text}
                    onClick={() => this.handleListItemSelect(text)}
                  >
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
          <Divider />
          <Button onClick={this.handleUserLogout}>Log out</Button>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.isDrawerOpen,
          })}
        >
          <div className={classes.drawerHeader} />
          {this.state.selectedListItem === "New OPD Bill" &&
            !(this.state.isDrawerOpen && !isBrowser) && <CreateOPD />}
          {this.state.selectedListItem === "View OPD Bill" &&
            !(this.state.isDrawerOpen && !isBrowser) && <ViewOPD />}
          {this.state.selectedListItem === "Edit OPD Bill" &&
            !(this.state.isDrawerOpen && !isBrowser) && <EditOPD />}
          {this.state.selectedListItem === "New IPD Bill" &&
            !(this.state.isDrawerOpen && !isBrowser) && <CreateIPD />}
          {this.state.selectedListItem === "View IPD Bill" &&
            !(this.state.isDrawerOpen && !isBrowser) && <ViewIPD />}
          {this.state.selectedListItem === "Edit IPD Bill" &&
            !(this.state.isDrawerOpen && !isBrowser) && <EditIPD />}
          {this.state.selectedListItem === "New Indoor Register" &&
            !(this.state.isDrawerOpen && !isBrowser) && (
              <CreateIndoorRegister />
            )}
          {this.state.selectedListItem === "Edit Indoor Register" &&
            !(this.state.isDrawerOpen && !isBrowser) && <EditIndoorRegister />}
          {this.state.selectedListItem === "New Discharge Card" &&
            !(this.state.isDrawerOpen && !isBrowser) && <CreateDischargeCard />}
          {this.state.selectedListItem === "Edit Discharge Card" &&
            !(this.state.isDrawerOpen && !isBrowser) && <EditDischargeCard />}
          {this.state.selectedListItem === "Print History" &&
            !(this.state.isDrawerOpen && !isBrowser) && <PrintHistory />}
        </main>
      </div>
    );
  };
}
export default withStyles(styles, { withTheme: true })(Home);
