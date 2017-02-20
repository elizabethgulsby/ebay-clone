import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxPromise from 'redux-promise';


// import SignInBar from './containers/SignInBar.js';
// import Jumbotron from './containers/Jumbotron.js';
import Home from './containers/Home.js'
import Login from './containers/Login.js'
import Register from './containers/Register.js'
import Search from './containers/Search.js'
import CreateListing from './containers/CreateListing.js'
import AuctionItem from './containers/AuctionItem.js'
import userPage from './containers/userPage.js'

import {Provider} from 'react-redux';

import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers/index';

// const middleWare = applyMiddleware(reduxPromise);
// const theStore = middleWare(createStore);
// const theStoreWithReducers = theStore(reducers);
const theStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore)(reducers);

ReactDOM.render (
	<Provider store={theStoreWithMiddleware}>
		<Router history={browserHistory}>
  			<Route path="/" component={App}>
  				<IndexRoute component={Home} />
  				<Route path="login" component={Login} />
  				<Route path="register" component={Register} />
  				<Route path="search/:term" component={Search} />
          <Route path="/createlisting" component={CreateListing} />
          <Route path="auction/:auctionId" component={AuctionItem} />
          <Route path="/account" component={userPage} />
  			</Route>
  		</Router>
	</Provider>,
  document.getElementById('root')
);
