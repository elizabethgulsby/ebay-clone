import React, {Component} from 'react';
import SignInBar from '../containers/SignInBar.js';
import Jumbotron from '../containers/Jumbotron.js';
import CurrentItems from '../containers/CurrentItems.js';

class Home extends Component {

	// componentDidMount() {
	// 	this.props.getHomeData();
	// }

	render() {
		return(
			<div>
				<SignInBar />
				<Jumbotron />
				<CurrentItems />
			</div>
		);
	}
}

export default Home;