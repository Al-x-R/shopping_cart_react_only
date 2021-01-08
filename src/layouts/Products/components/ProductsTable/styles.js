import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  title: {
    color: 'black',
    fontSize: '25px',
    padding: '20px 0 30px',
  },
  table: {
    margin: '50px auto 0',
    maxWidth: 800,
  },
  qtyField: {
    width: '50px'
  }
});

export default useStyles;