import React, { useContext, useCallback, useMemo } from 'react';
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

import useStyles from './Cart.styles';

const Cart = () => {
  const discountValueInPercents = 50;
  const discountProductNames = ['папайя'];

  const [{ cart }, dispatch] = useContext(AppContext);
  const ids = useMemo(() => Object.keys(cart) ?? [], [cart]);

  const onChangeInputQtyHandler = useCallback((e) => {
    const { id } = e.target;

    dispatch({
      type: ACTIONS.SET_PRODUCT_CART_QUANTITY,
      payload: {
        id,
        quantity: Number(e.target.value),
      },
    });
  }, [dispatch]);

  function sum(price, qty, name) {
    if (discountProductNames.includes(name)) {

      const discount = Math.trunc(Number(qty) / 3) *
        (price * (discountValueInPercents / 100));

      return  price * qty - discount;

    }
    return  price * qty;
  }

  const totalOrderPrice = useMemo(() => ids.map((id) => {
    const { quantity, product } = cart[id];
    const totalPrice = quantity * product.price;

    if (product.discount) {
      return totalPrice - (
        Math.trunc(quantity / 3) * (
          product.price * (discountValueInPercents / 100)
        )
      );
    }

    return totalPrice;
  }).reduce((total, price) => total + price, 0).toFixed(2), [ids]);


  const pageTitle = (
    ids.length === 0
  )
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
                  type='number'
                  id={id}
                  InputProps={{ inputProps: { min: 1 } }}
                  className={classes.qtyField}
                  onChange={onChangeInputQtyHandler}
                  defaultValue={Number(cart[id].quantity)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >{cart[id].quantity}</TextField>
              </TableCell>
              <TableCell
                align="center">
               {sum(cart[id].product.price, cart[id].quantity, cart[id].product.name)}
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
            <TableCell align="right">At a discount: {discountProductNames[0]}</TableCell>
            <TableCell align="center">Every third kg -50%</TableCell>
            <TableCell/>
            <TableCell align="left">Amount to pay:</TableCell>
            <TableCell align="center">{totalOrderPrice} $</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      }
    </div>
  );
};

export default Cart;
