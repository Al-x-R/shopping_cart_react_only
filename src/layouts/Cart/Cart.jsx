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

  function sum(a, b) {
    return (
      Number(a) * Number(b)
    ).toFixed(2);
  }


  const totalOrderPrice = useMemo(() => ids.reduce((total, id) => total + (
    cart[id].product.price * cart[id].quantity
  ), 0).toFixed(2), [ids]);


  const discount = ids.map(id => {
    return Math.trunc(Number(cart[id].quantity) / 3) * (
           cart[id].product.price * (
             discountValueInPercents / 100
           )
    );
  });

  const totalSum = ids.length > 0
                   ? (
                     totalOrderPrice - discount.reduce((a, b) => a + b)
                   )
                     .toFixed(2)
                   : totalOrderPrice;

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
             <TableCell />
             <TableCell />
             <TableCell />
             <TableCell align="left">Total:</TableCell>
             <TableCell align="center">{totalOrderPrice} $</TableCell>
           </TableRow>
           <TableRow>
             <TableCell align="right">Stock:</TableCell>
             <TableCell align="center">Every third kg -50%</TableCell>
             <TableCell />
             <TableCell align="left">Amount to pay:</TableCell>
             <TableCell align="center">{totalSum} $</TableCell>
           </TableRow>
         </TableBody>
       </Table>
      }
    </div>
  );
};

export default Cart;
