import $ from 'jquery';

export default function(auctionId) {
	var thePromise = $.getJSON('http://localhost:3000/getAuctionItem/' + auctionId)
	// console.log(thePromise);
	return {
		type: "get_auction_detail",
		payload: thePromise
	}
}