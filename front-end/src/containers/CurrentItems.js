import React, { Component } from 'react';
import Auction from '../components/Auction.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import getHomeListingsAction from '../actions/getHomeListingsAction';

class CurrentItems extends Component {
	render() {
		console.log(this.props.homeData);
		var homeAuctions = [];
		this.props.homeListingsData.map((auction, index) => {
			homeAuctions.push(<Auction key={index} item={auction} />);
		});
		return (
			<div className="container">
			{homeAuctions}
				<div className="row current-items">
					Trending items go here
				</div>
					<div className="row">
						<div className="col-sm-12">
							<div className="col-sm-4 trending">
								<img className="auction-item" src="http://placehold.it/200x200" role="presentation" />
								<h4>Title Goes Here</h4>
								<button>More Info</button>
							</div>
							<div className="col-sm-4 trending">
								<img src="http://placehold.it/200x200" role="presentation"/>
								<h4>Title Goes Here</h4>
								<button>More Info</button>
							</div>
							<div className="col-sm-4 trending">
								<img src="http://placehold.it/200x200" role="presentation"/>
								<h4>Title Goes Here</h4>
								<button>More Info</button>
							</div>
							<div className="col-sm-4 trending">
								<img src="http://placehold.it/200x200" role="presentation"/>
								<h4>Title Goes Here</h4>
								<button>More Info</button>
							</div>
							<div className="col-sm-4 trending">
								<img src="http://placehold.it/200x200" role="presentation"/>
								<h4>Title Goes Here</h4>
								<button>More Info</button>
							</div>
							<div className="col-sm-4 trending">
								<img src="http://placehold.it/200x200" role="presentation"/>
								<h4>Title Goes Here</h4>
								<button>More Info</button>
							</div>
						</div>
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
