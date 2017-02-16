import React, {Component} from 'react';
import LoginAction from '../actions/LoginAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginResponse: ''
		}
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin(event) {
		event.preventDefault();
		this.props.loginAction({
			username: event.target[0].value,
			password: event.target[1].value
		})
	}

	render() {
		if (this.props.loginResponse.msg === "Bad user name!") {
			var Message = "That user name does not exist!";
		}
		else if (this.props.loginResponse.msg === "Bad Password!") {
			Message = "That password does not match!!";
		}
		else if (this.props.loginResponse.msg === "found user!") {
			browserHistory.push('/');
		}
		else {
			Message = 'Login Page';
		}
		return(
			<div className="container">
				<div className="row">
					<h1>{Message}</h1>
						<form className="register" onSubmit={this.handleLogin}>
							<input type="text" placeholder="Username" />
							<input type="password" placeholder="Password" />
							<input type="submit" value="Login!" />
						</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		loginResponse: state.login
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		loginAction: LoginAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
