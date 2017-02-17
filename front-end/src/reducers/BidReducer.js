export default function (state = [], action) {
	// console.log(action.type);
	switch (action.type) {
	case "submit_bid":
		// console.log("I'm the BidReducer, and some action called submit_bid!");
		console.log(action.payload);
		return action.payload
	default:
		return state;
	}
}