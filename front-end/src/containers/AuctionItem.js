import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GetAuctionDetail from '../actions/GetAuctionDetail';
import SubmitBidAction from '../actions/SubmitBidAction';


class AuctionItem extends Component {
	constructor(props) {
		super(props);
		this.submitBid = this.submitBid.bind(this);
	}

	componentDidMount() {
		var auctionId = this.props.params.auctionId;
		this.props.getThisAuction(auctionId);
	}

	submitBid(event) {
		event.preventDefault();
		console.log(this.props.userToken);
		if (this.props.userToken  === undefined) {
			// route user to login
		}
		else {
			var bidAmount = Number(event.target[0].value);
			// console.log(typeof(bidAmount));
			var auctionItem = this.props.auctionItemDetail[0];
			if (auctionItem.current_bid === "No Bids Yet!") {
				auctionItem.current_bid = Number(auctionItem.starting_bid) - .01;
			}
			else if (bidAmount < auctionItem.current_bid) {
				console.log("Bid Too Low!");
			}
			else {
				console.log("Submit to Express!");
				this.props.submitBidToExpress(bidAmount, auctionItem.id, this.props.userToken)
			}
		}
	}

	render() {
            if(this.props.auctionItemDetail.length === 0){
                return(<h1>Loading auction...</h1>)
            }
            var auctionItem = this.props.auctionItemDetail[0];
            // console.log(auctionItem);
            if (auctionItem.current_bid === null) {
            	auctionItem.current_bid = "No Bids Yet!";
            }
		return (
			<div className="auction-detail-page">
				<h4>{auctionItem.title}</h4>
				<p>{auctionItem.desc}</p>
				<p>Current High Bid: {auctionItem.current_bid}</p>
				<p>High Bidder: {auctionItem.high_bidder_id}</p>
				<p>Starting Bid: {auctionItem.starting_bid}</p>
				<form onSubmit={this.submitBid}>
					<input type="number" placeholder="Enter Your Bid" />
					<button type="submit">Bid</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auctionItemDetail: state.auctionItem,
		userToken: state.login.token
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getThisAuction: GetAuctionDetail,
		submitBidToExpress: SubmitBidAction
	}, dispatch)
	
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionItem);
