import $ from 'jquery';

export default function(loginData) {
	var thePromise = $.ajax({ //ajax request = stateless
		method: "POST",
		url: "http://localhost:3000/login",
		data: loginData
	});
	return {
		type: "login",
		payload: thePromise
	}
}