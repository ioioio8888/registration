import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button'
import { Route } from 'react-router'
import UserList from '@material-ui/icons/SupervisedUserCircle'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: 80,
    right: theme.spacing(2),
  },
  footer: {
    top: 'auto',
    bottom: 0,
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Main(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
        <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="go back"
            onClick={() => props.history.push('/userlist')}
          >
            <UserList/>
          </IconButton>
          <Typography variant="h6">APAC Blocks</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container style={{ minHeight: '100vh' }}>
        <Box my={2}>
        <h2>Membership Protocol</h2>
        <p>New members can only join the organisation while in <b>physical attendance at an APAC Blocks event</b>.</p>
        <p>Any member can invite a maximum of two new members - membership is by invitation <b>only</b>.</p>
        <p>When the 88th person has joined as a member, an on-chain state change will be triggered giving all members the ability the vote on what (if any) membership fee should be charged.</p>
        <h3>How to become a member</h3>
        <p>Click join below, you will be asked to scan the QR code of an existing member.</p>
        <p>You will then be asked for a Bitcoin address, it is critical that you do not lose the private key for this address as this will be required for voting and recieving associated tokens.</p>
        <h3>How to invite a member</h3>
        <p>Simply login with your existing credentials, a QR code to invite new members will automatically be displayed.</p>
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <AppBar position="sticky" color="primary" className={classes.footer}>
        <Toolbar>
          <Route render={({ history }) => (
            <Button color="inherit" style={{ width: '50%' }}
              onClick={() => { history.push('/join') }}
            >
              Join
      </Button>
          )} />

          <Route render={({ history }) => (
            <Button color="inherit" style={{ width: '50%' }}
              onClick={() => { history.push('/login') }}
            >
              {(Meteor.user())? "Profile": "Login / Profile"}
      </Button>
          )} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
