import React, {Component} from 'react';
import { Link } from 'react-router';

class Auction extends Component {
	constructor(props) {
		super(props);
		
	}
	// console.log(this.props.item);
	render() {
		var auctionItem = this.props.item;
		var auctionLink = "/auction/" + auctionItem.id;
		return (
			// <div className="home-auction">
			// 	<div className="title">
			// 		<Link to={auctionLink}>{auctionItem.title}</Link>
			// 	</div>
			// 	<div className="auction-image">
			// 		<Link to={auctionLink}><img src={auctionItem.url} /></Link>
			// 	</div>
			// </div>
			
			<div className="col-sm-4 trending">
				<img className="auction-item" src={auctionItem.url} role="presentation" />
				<div className="item-title"><h4>{auctionItem.title}</h4></div>
				<Link to={auctionLink}><button type="submit">More Info</button></Link>
			</div>
		)
	}
}

export default Auction;