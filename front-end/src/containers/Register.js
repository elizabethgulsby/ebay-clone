import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RegisterAction from '../actions/RegisterAction.js';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
		this.handleRegister = this.handleRegister.bind(this);
		this.getUserName = this.getUserName.bind(this);
		this.getPassword = this.getPassword.bind(this);
	}

	handleRegister(event) {
		event.preventDefault();
		// console.dir(event.target);
		// event.target.children.map
		var Username = event.target[0].value;
		var Password = event.target[1].value;
		this.props.registerAction({
			username: Username, 
			password: Password
		});
	}

	getUserName(event) {
		this.setState({
			username: event.target.value
		});
		console.log(event.target.value)
	}

	getPassword(event) {
		this.setState({
			password: event.target.value
		});
		console.log(event.target.value)
	}

	render() {
		console.log(this.props);
		if (this.props.registerResponse.msg === "User name taken") {
			var Message = "User Name Is Taken!";
		}
		else if (this.props.registerResponse.msg === "User inserted") {
			Message = "User was inserted!";
		}
		else {
			Message = 'Register Here!';
		}
		return(
			<div>
				<h1>{Message}</h1>
				<form className="register" onSubmit={this.handleRegister}>
					<input type="text" name="username" value={this.state.getUserName} placeholder="Username" />
					<input type="password" name="password" value={this.state.getPassword} placeholder="Password" />
					<input type="submit" value="Register!" />
				</form>
				
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		registerResponse: state.register
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		registerAction: RegisterAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);