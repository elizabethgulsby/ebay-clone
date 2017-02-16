import $ from 'jquery';

export default function(registerData) {
	var thePromise = $.ajax({ //ajax request = stateless
		method: "POST",
		url: "http://localhost:3000/register",
		data: registerData
	});
	return {
		type: "register",
		payload: thePromise
	}
}