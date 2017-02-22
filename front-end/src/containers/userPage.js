import React, {Component} from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import Bids from '../containers/Bids.js';
// import $ from 'jquery';


class userPage extends Component {
	constructor(props) {
		super(props);
		this.changeActiveClass = this.changeActiveClass.bind(this);
	}

	changeActiveClass(event) {
		event.preventDefault();
		//remove all pre-existing active classes
		$('.active').removeClass('active');

		//add the active class to the link we clicked
		$(event.target).parent().addClass('active');
		// console.log($(event.target).parent());	
		$('.greeting').remove();
	}

	render() {
		return (
			<div>
				<div className="container">
				    <div className="row">
				        <div className="col-md-3">
				            <ul className="nav nav-pills nav-stacked well">
				                <li className="active"><Link to="/"><i className="fa fa-home fa-fw"></i>Home</Link></li>
				                <li onClick={this.changeActiveClass}><Link to="/bids"><i className="fa fa-list-alt fa-fw"></i>Bids</Link></li>
				                <li onClick={this.changeActiveClass}><Link to="/buys"><i className="fa fa-usd fa-fw"></i>Buys</Link></li>
				                <li onClick={this.changeActiveClass}><Link to="/lists"><i className="fa fa-th-list fa-fw"></i>Lists</Link></li>
				                <li onClick={this.changeActiveClass}><Link to="/settings"><i className="fa fa-cogs fa-fw"></i>Settings</Link></li>
				            </ul>
				        </div>
				        <div className="col-md-9">
				        <h1 className="greeting">Please select an option to the left.</h1>
				            {this.props.children}
				        </div>
				    </div>
				</div>
			</div>
		)
	}
}

export default userPage;