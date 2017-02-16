import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

class SignInBar extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {
		return (
			<div className="container">
			<div className="row">
				<div className="col-sm-12 sign-in">
					<nav className="navbar navbar-default">
  						<div className="col-sm-3">
  							<img src="http://placehold.it/200x65" />
  						</div>
  						<div className="col-sm-4">
  							<input placeholder="Search..."/>
  							<button type="submit" className="btn btn-primary btn-sm">Search</button>
  						</div>
  						<div className="col-sm-2">
  							<a href="#">Create Listing</a>
  						</div>
  						<div className="col-sm-1">
  							<a href="#">Sign In</a>
  							
  						</div>
  						<div className="col-sm-1">
  							<a href="#">Register</a>
  						</div>
					</nav>
				</div>
			</div>
		</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		search: state.search
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({

	})
}

export default SignInBar;
