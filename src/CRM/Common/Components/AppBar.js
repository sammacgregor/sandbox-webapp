import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle'
import Drawer from './Drawer';
import AuthMenu from './AuthMenu';

const useStyles = makeStyles(theme => ({

  root: {
    flexGrow: 1,
    margin: '0px 0px 100px 0px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));






export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [setAnchorEl] = React.useState(null);




  function showAuthContent(isAuthenticated) {
    if (!isAuthenticated) {
      return <Button color="inherit">Login</Button>
    } else {
      return <AuthMenu />
    }
  }

  const authModule = showAuthContent(props.isAuthenticated);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Drawer />
          <Typography variant="h6" className={classes.title}>
            Customer Dashboard
          </Typography>
          <Button color="inherit">...</Button>
          {authModule}

        </Toolbar>
      </AppBar>
    </div>
  );
}