import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GetAuctionDetail from '../actions/GetAuctionDetail';
import SubmitBidAction from '../actions/SubmitBidAction';
import $ from 'jquery';


class AuctionItem extends Component {
	constructor(props) {
		super(props);
		this.submitBid = this.submitBid.bind(this);
		this.makePayment = this.makePayment.bind(this);
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

	makePayment() {
		console.log("test");
		var handler = window.StripeCheckout.configure({
			key: 'pk_test_Rd8rrPFKgjdA6K3443hin6Ct',
			locale: 'auto',
			token: function(stripeToken) {
				console.log(stripeToken)
				var theData = {
					amount: 10 * 100,
					stripeToken: stripeToken.id,
					token: localStorage.getItem('token')
				}
				$.ajax({
					method: "POST",
					url: 'http://localhost:3000/stripe',
					data: theData
				}).done((data) => {
					console.log("Express, response, and the response is....")
					console.log(data); //data here is the res.json that will be returned from ajax call
					if (data.msg == 'paymentSuccess') {
						// hide/replace button - changes what user sees based on what Express tells it to do
					}
				});
			}
		});
		console.log(handler);
		handler.open({
			name: "Buy stuff from my auction site",
			description: "Pay for your auction",
			amount: 10 * 100
		})
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
				<button className="btn btn-primary btn-sm" onClick={this.makePayment}>Pay My Auction!</button>
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
