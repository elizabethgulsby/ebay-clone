export default function (state = [], action) {
	console.log('$$$$$$$$$$$$$$$$$$$$$$$$');
	console.log(action.type);
	// console.log(action.payload);
	console.log('$$$$$$$$$$$$$$$$$$$$$$$$');
	switch (action.type) {
	case "login":
		console.log("I'm the loginReducer, and some action called login!");
		return action.payload
	}
	return state;
}