import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router';

class SignInBar extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {
		return (
			<div className="navbar">
				<div className="nav-container">
					<div className="brand">
						<Link to='/'><img src="https://upload.wikimedia.org/wikipedia/commons/4/48/EBay_logo.png" /></Link>
					</div>

					<div className="search">
						<Form inline>
							<FormGroup>
								<FormControl className="input" placeholder="Search" />
							</FormGroup>
							<Button className="search-button" bsStyle="primary" bsSize="small" type="submit">Search</Button>
						</Form>
					</div>

					<div className="actions">
						<Link to='/createlisting' className="create-listings">Create Listing</Link>
						<Link to='/login' className="sign-in"> Sign In</Link> | <Link to='/register' className="register-link">Register</Link>
					</div>

				</div>
			</div>
		);
	}
}

export default SignInBar;
