export default function (state = [], action) {
	console.log(action.type);
	switch (action.type) {
	case "get_home":
		console.log("I'm the GetHomeReducer, and some action called get_home!");
		return action.payload
	}
	return state;
}