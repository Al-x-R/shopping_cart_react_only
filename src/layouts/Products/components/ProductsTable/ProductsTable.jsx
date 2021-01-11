import React, { useContext } from 'react';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { ACTIONS } from '../../../../constants';
import AppContext from '../../../../AppContext';
import useStyles from './styles';

const ProductsTable = () => {
  const [{ products }, dispatch] = useContext(AppContext);

  const classes = useStyles();

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell align="left">Product Name</TableCell>
          <TableCell align="center">Price</TableCell>
          <TableCell align="right">Add to cart</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          products.map(({ id, name, price }, index) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell align="center">{price} $</TableCell>
              <TableCell align="right">{
                <Button onClick={() => {
                  dispatch({
                    type: ACTIONS.ADD_PRODUCT_TO_CART,
                    payload: {
                      index,
                    },
                  });
                }
                }><AddShoppingCartIcon/>
                </Button>
              }
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
