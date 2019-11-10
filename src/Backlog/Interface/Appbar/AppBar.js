import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import BoardModal from '../Board/BoardModal';
import BoardModel from '../../Models/BoardModel';
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar(props) {

  const classes = useStyles();
  const [boardAnchorEl, setBoardAnchorEl] = React.useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [menuBoards, setMenuBoards] = React.useState([]);


  const isBoardMenuOpen = Boolean(boardAnchorEl);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleAccountMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };




  const handleBoardMenuOpen = event => {
    setBoardAnchorEl(event.currentTarget)

    var board = new BoardModel({});
    board.GetBoards().then(results => {
      setMenuBoards(results.data)

      console.log("Fetched board menu items")
      return results.data
    })



  };


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };




  const handleBoardMenuClose = (e) => {
    setBoardAnchorEl(null);

    if (!e.target.value) { } else {
      props.setBoard(e.target.value);

    }
    handleMobileMenuClose();

  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);

    if (!e.target.value) { } else {
      props.setBoard(e.target.value);

    }
    handleMobileMenuClose();

  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';



  const renderAccountMenu = (

    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

<MenuItem component={Link} to={"../admin"} onClick={handleMenuClose}>Admin</MenuItem>
      <MenuItem component={Link} to={"../account"} onClick={handleMenuClose}>Account</MenuItem>
      <MenuItem component={Link} to={"../logout"} onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );




  const addBoard = (board) => {

    board.CreateBoard().then(result => {
      if (result.error === false) {

      } else {
        // this.setState({ errorModal: true })
      }
    })
    return board;


  };

  const boardMenuId = 'available-boards-menu';
  const renderBoardMenu = (
    <Menu
      anchorEl={boardAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={boardMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isBoardMenuOpen}
      onClose={handleBoardMenuClose}
    >

      {
        menuBoards.map(board =>

          <MenuItem onClick={handleBoardMenuClose} component={Link} to={"../boards/" + board.board_id} key={board.board_id} value={board.board_id}>{board.board_name}</MenuItem>
        )

      }

      <Divider />

      <MenuItem onClick={handleBoardMenuClose} component={Link} to={"../boards"}>All boards</MenuItem>

      <Divider />

      <BoardModal addBoard={addBoard} handleBoardMenuClose={handleBoardMenuClose} />


    </Menu>
  );


  const renderDesktopMenu = (
    <div>
      {
        props.auth === true &&
        <div>

          <Button component={Link} to={"../search"} className={classes.button}>Search</Button>
          <Button
            className={classes.button}
            edge="end"
            aria-label="avaiable boards menu"
            aria-controls={boardMenuId}
            aria-haspopup="true"
            onClick={handleBoardMenuOpen}
            color="inherit"

          >
            Boards
      </Button>


          <IconButton
            aria-controls={menuId}
            onClick={handleAccountMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
      }
      {
        props.auth === false &&

        <Button
          component={Link} to={"../access"}
          className={classes.button}
          color="inherit"
        >
          Login / Signup
      </Button>
      }
    </div>

  )




  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (

    < div >


      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={handleBoardMenuOpen}><p>Boards</p></MenuItem>
        <MenuItem component={Link} to={"../account"} onClick={handleMenuClose}>Account</MenuItem>
        <MenuItem component={Link} to={"../logout"} onClick={handleMenuClose}>Logout</MenuItem>

      </Menu>

    </div >
  );

  return (
    <div className={classes.grow}>
      <AppBar position="absolute" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography component={Link} to={"../"} className={classes.title} variant="h6" noWrap>
            Backlog
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {renderDesktopMenu}
          </div>
          <div className={classes.sectionMobile}>
            {
              props.auth === true &&
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            }
            {props.auth === false &&

              <Button
                component={Link} to={"../access"}
                className={classes.button}
                color="inherit"
              >
                Login / Signup
</Button>

            }
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderAccountMenu}
      {renderBoardMenu}

    </div>
  );
}
