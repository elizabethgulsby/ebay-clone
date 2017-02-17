import $ from 'jquery';

export default function() {
	var thePromise = $.getJSON('http://localhost:3000/getHomeAuctions')
	console.log(thePromise);
	return {
		type: "get_home_listings",
		payload: thePromise
	}
}