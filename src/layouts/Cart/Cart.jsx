import React, { useContext, useState } from 'react';
import AppContext from '../../AppContext';
import { ACTIONS } from '../../constants';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';

import useStyles from './styles';

const Cart = () => {
  const discountValueInPercents = 50;
  const [{ cart }, dispatch] = useContext(AppContext);
  const ids = Object.keys(cart);

  const [qty, setQty] = useState(1);

  const handlerQty = (e) => {
    setQty(e.target.value);
  };

  function sum(a, b) {
    return (Number(a) * Number(b)).toFixed(2);
  }

  let totalCartSum;
  if (ids.length > 0) {
    totalCartSum = ids.map(id => cart[id].product.price * cart[id].quantity)
      .reduce((a, b) => a + b)
      .toFixed(2);
  }

  const discount = ids.map(id => {
    return Math.trunc(Number(cart[id].quantity) / 3) * (cart[id].product.price * (discountValueInPercents / 100));
  });

  const totalSum = ids.length > 0
    ? (totalCartSum - discount.reduce((a, b) => a + b))
      .toFixed(2)
    : totalCartSum;

  const pageTitle = (ids.length === 0)
    ? 'Your cart is empty'
    : 'Your products';

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{pageTitle}</Typography>
      {ids.length > 0 &&
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Product Name</TableCell>
            <TableCell align="center">Price $</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Refresh</TableCell>
            <TableCell align="center">Sum</TableCell>
            <TableCell align="center">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ids.map(id => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {cart[id].product.name}
              </TableCell>
              <TableCell align="center">{cart[id].product.price.toFixed(2)}</TableCell>
              <TableCell align="center">
                <TextField
                  className={classes.qtyField}
                  onChange={handlerQty}
                  defaultValue={Number(cart[id].quantity)}
                  type='number'
                  id="standard-number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                >{cart[id].quantity}</TextField>
              </TableCell>
              <TableCell align="center">
                <CachedOutlinedIcon onClick={() => {
                  dispatch({
                    type: ACTIONS.SET_PRODUCT_CART_QUANTITY,
                    payload: {
                      id,
                      quantity: qty,
                    },
                  });
                }}
                />
              </TableCell>
              <TableCell
                align="center">{sum(cart[id].product.price, cart[id].quantity)}
              </TableCell>
              <TableCell align="center">
                <DeleteOutlinedIcon onClick={() => {
                  dispatch({
                    type: ACTIONS.REMOVE_PRODUCT_FROM_CART,
                    payload: {
                      id,
                    },
                  });
                }}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell align="left">Total:</TableCell>
            <TableCell align="center">{totalCartSum} $</TableCell>
            <TableCell/>
          </TableRow>
          <TableRow>
            <TableCell/>
            <TableCell align="right">Stock:</TableCell>
            <TableCell align="center">Every third kg -50%</TableCell>
            <TableCell align="left">To pay:</TableCell>
            <TableCell align="center">{totalSum} $</TableCell>
            <TableCell/>
          </TableRow>
        </TableBody>
      </Table>
      }
    </div>
  );
};

export default Cart;