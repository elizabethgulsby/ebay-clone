import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import getHomeAction from '../actions/getHomeAction';
import Auction from '../components/Auction.js';

class Home extends Component {

	componentDidMount() {
		this.props.getHomeData()
	}

	render() {
		console.log(this.props.homeData);
		var homeAuctions = [];
		this.props.homeData.map((auction, index) => {
			homeAuctions.push(<Auction key={index} item={auction} />);
		});
		return(
			<div>
				<h1>Home</h1>
				{homeAuctions}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		homeData: state.home
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getHomeData: getHomeAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);