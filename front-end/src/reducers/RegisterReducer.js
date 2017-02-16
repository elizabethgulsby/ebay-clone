export default function (state = [], action) {
	// console.log(action.type);
	switch (action.type) {
	case "register":
		console.log("I'm the RegisterReducer, and some action called register!");
		// console.log(action.payload);
		return action.payload
	}
	return state;
}