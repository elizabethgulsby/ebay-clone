import React, {Component} from 'react';

class Auction extends Component {
	constructor(props) {
		super(props);
		
	}
	// console.log(this.props.item);
	render() {
		var auctionItem = this.props.item;
		return (
			<div>
				<div className="title">
					{auctionItem.title}
				</div>
				<div className="auction-image">
					<img src={auctionItem.url} />
				</div>
			</div>
		)
	}
}

export default Auction;