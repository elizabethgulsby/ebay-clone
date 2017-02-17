import React, { Component } from 'react';
import Auction from '../components/Auction.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import getHomeListingsAction from '../actions/getHomeListingsAction';

class CurrentItems extends Component {

	componentDidMount() {
		this.props.getHomeData();
		console.log("test");
	}

	render() {
		console.log(this.props.homeData);
		var homeAuctions = [];
		this.props.homeListingsData.map((auction, index) => {
			homeAuctions.push(<Auction key={index} item={auction} />);
		});
		console.log(this.props.homeListingsData);
		return (
			<div className="container">
				<div className="row current-items">
						{homeAuctions}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		homeListingsData: state.currentItems
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getHomeData: getHomeListingsAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentItems);
