import React, { useContext, useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import AppContext from '../../AppContext';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    display: 'none',
    textDecoration: 'none',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const Header = () => {
  const [{ cart }] = useContext(AppContext);
  const ids = Object.keys(cart).length;

  const [isProducts, setIsProducts] = useState();
  const location = useLocation();

  useLayoutEffect(() => {
    setIsProducts(location.pathname === '/');
  }, [location.pathname]);

  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Typography className={classes.title}
                      component={Link}
                      to={'/'}
                      variant="h6" noWrap>
            SOME SHOP
          </Typography>
          <div>
            {
              isProducts && <IconButton component={Link}
                                       to={'/cart'}
                                       color="inherit">
              <Badge badgeContent={ids} color="secondary" showZero>
                <ShoppingCartIcon/>
              </Badge>
            </IconButton>
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
