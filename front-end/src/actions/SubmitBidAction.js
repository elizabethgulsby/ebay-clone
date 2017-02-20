import $ from 'jquery';

export default function(bidAmount, auctionItemId, userToken) {
	// make sure Express knows who we are...from our token
	//need a query in Express that makes use of the items in the object
	var bidInfo = {
		bidAmount: bidAmount,
		auctionItemId: auctionItemId,
		userToken: userToken
	}
	var thePromise = $.ajax({ //ajax request = stateless
		method: "POST",
		url: "http://localhost:3000/submitBid",
		data: bidInfo
	});
	return {
		type: "submit_bid",
		payload: thePromise
	}
}