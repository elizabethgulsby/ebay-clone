var express = require('express');
var router = express.Router();
var config = require('../config/config')
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});

connection.connect();

/* GET top 6 auctions. */
router.get('/getHomeAuctions', function(req, res, next) {
	var auctionsQuery = "SELECT * FROM auctions " +  
		"INNER JOIN images ON images.auction_id = auctions.id " + 
		" limit 6";
	connection.query(auctionsQuery, (error, results, fields) => {
		if (error) throw error;
		res.json(results);
	});
});

// Make a register post route to handle registration
router.post('/register', function(req, res, next) {
	checkDupeUserQuery = "SELECT * FROM users where username = ?";
	connection.query(checkDupeUserQuery, [req.body.username], (error, results, fields) => {
		if (results.length === 0) {
			// Go ahead and register this person
			var insertUserQuery = "INSERT INTO users (username, password) VALUES " + 
				"(?, ?)";
			connection.query(insertUserQuery, [req.body.username, req.body.password], (error2, results2, fields2) => {
				res.json({
					msg: "User inserted"
				})
			});
		}
		else {
			res.json({
				msg: "User name taken"
			})
		}
		// console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");
		// console.log(results);
	})
});

module.exports = router;
