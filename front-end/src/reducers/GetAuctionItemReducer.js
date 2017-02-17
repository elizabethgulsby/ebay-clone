export default function (state = [], action) {
	console.log(action.type);
	switch (action.type) {
	case "get_auction_detail":
		// console.log("I'm the GetAuctionItemReducer, and some action called get_auction_detail!");
		return action.payload
		default:
			return state;
	}
}