import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import decode from 'jwt-decode';
import { userLoggedIn } from './actions/auth';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import de semantic ui
import "semantic-ui-css/semantic.min.css";

//mport du store général rootReducer
import rootReducer from './rootReducer';

import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.bookwormJWT) {
    const payload = decode(localStorage.bookwormJWT);
    const user = { token: localStorage.bookwormJWT, email: payload.email, confirmed: payload.confirmed };
    store.dispatch(userLoggedIn(user));
};

ReactDOM.render(
<BrowserRouter>
<Provider store={store}>
<Route component={App} />
</Provider>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
