import React, { lazy, Suspense, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import reducer from './reducer';
import { ACTIONS, CART_KEY } from './constants';
import AppContext from './AppContext';
import * as API from './api';
import CircularProgress from '@material-ui/core/CircularProgress';



const initialState = {
  products: [],
  isLoading: false,
  error: null,
  cart: {},
};

const initializer = (savedShoppingCard) => {
  return {
    ...initialState,
    cart: savedShoppingCard ?? {},
  };
};

const App = () => {

  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem(CART_KEY) ?? '{}'),
    initializer,
  );

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <Suspense fallback={<CircularProgress/>}>
        <Router>
          <Switch>
            <Route exact path="/" component={}/>
            <Route path="/cart" component={} />
            <Router path="*" component={() => 'Not Found'}/>
          </Switch>
        </Router>
      </Suspense>
    </AppContext.Provider>
  );
};

export default App;
