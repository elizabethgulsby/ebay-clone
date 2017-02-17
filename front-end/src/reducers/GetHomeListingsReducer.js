export default function (state = [], action) {
	// console.log(action.type);
	switch (action.type) {
	case "get_home_listings":
		console.log("I'm the GetHomeListingsReducer, and some action called get_home_listings!");
		return action.payload
	}
	return state;
}