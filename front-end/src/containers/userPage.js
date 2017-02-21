import React, {Component} from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import Bids from '../containers/Bids.js';

class userPage extends Component {
	render() {
		return (
			<div>
				<div className="container">
				    <div className="row">
				        <div className="col-md-3">
				            <ul className="nav nav-pills nav-stacked well">
				                <li className="active"><Link to="#"><i className="fa fa-home fa-fw"></i>Home</Link></li>
				                <li><Link to="/bids"><i className="fa fa-list-alt fa-fw"></i>Bids</Link></li>
				                <li><Link to="/buys"><i className="fa fa-usd fa-fw"></i>Buys</Link></li>
				                <li><Link to="/lists"><i className="fa fa-th-list fa-fw"></i>Lists</Link></li>
				                <li><Link to="/settings"><i className="fa fa-cogs fa-fw"></i>Settings</Link></li>
				            </ul>
				        </div>
				        <div className="col-md-9">
				            <h1>Content goes here</h1>
				            <p>content from the respective navbar links will go here</p>
				            <Bids />
				        </div>
				    </div>
				</div>
			</div>
		)
	}
}

export default userPage;