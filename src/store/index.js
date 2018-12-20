import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];

let composeMiddlewares = compose(applyMiddleware(...middleware));

if (window.navigator.userAgent.includes('Chrome')) {
  composeMiddlewares = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}

const store = createStore(rootReducer, initialState, composeMiddlewares);

export default store;
