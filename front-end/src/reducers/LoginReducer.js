export default function (state = [], action) {
	console.log('$$$$$$$$$$$$$$$$$$$$$$$$');
	console.log(action.type);
	// console.log(action.payload);
	console.log('$$$$$$$$$$$$$$$$$$$$$$$$');
	switch (action.type) {
	case "login":
		// console.log("I'm the loginReducer, and some action called login!");
		localStorage.setItem('token', action.payload.token);
		return action.payload
		default: 
			return state;
	}
}