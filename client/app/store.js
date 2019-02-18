import { createStore } from 'redux';

import rootReducer from './reducers/index';

// create an object for the default data
const defaultState = {

};

const store = createStore(rootReducer, defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
