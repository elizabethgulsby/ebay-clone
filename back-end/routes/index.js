var express = require('express');
var router = express.Router();
var config = require('../config/config');
var randtoken = require('rand-token');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});

connection.connect();

// password encryption/hash (for database)
var bcrypt = require('bcrypt-nodejs');

var hashedPassword = bcrypt.hashSync('x');
console.log(hashedPassword); //will show up in console
var checkHash = bcrypt.compareSync('x', hashedPassword);
console.log(checkHash); 
// checkHash = bcrypt.compareSync('bacon', hashedPassword); (returns false - password is NOT bacon)
// console.log(checkHash);

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

// Make a register post route to handle registration (redux action makes this, here)
router.post('/register', function(req, res, next) {
	checkDupeUserQuery = "SELECT * FROM users where username = ?";
	connection.query(checkDupeUserQuery, [req.body.username], (error, results, fields) => {
		if (results.length === 0) {
			// Go ahead and register this person
			var insertUserQuery = "INSERT INTO users (username, password) VALUES " + 
				"(?, ?)";
			connection.query(insertUserQuery, [req.body.username, bcrypt.hashSync(req.body.password)], (error2, results2, fields2) => {
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

//make a login post route
router.post('/login', (req, res, next) => {
	var username = req.body.username;
	var password = req.body.password;
	var findUserQuery = "SELECT * FROM users WHERE username = ?";
	connection.query(findUserQuery, [req.body.username], (error, results, fields) => {
		if (error) throw error;
		if (results.length === 0) {
			//this is not a valid username!
				res.json({
					msg: "Bad user name!"
				});
			}
			else {
				//this is a valid username. We know because results.length > 0 - need to check against bcrypt to check for matches (won't work if any users have been added before bcrypt hashed passwords! Delete these rows from table!)
				checkHash = bcrypt.compareSync(password, results[0].password);
				console.log('###################');
				console.log(checkHash);
				console.log('###################');
				if (checkHash === false) {
					res.json({
						msg: "Bad Password!"
					})
				}
				else {
					//we have a match on username, and the hash password checks out
					// this is the droid we're looking for :D
					var token = randtoken.uid(40); 
					insertToken = "UPDATE users SET token=?, token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR) "+
                    	"WHERE username=?";
						connection.query(insertToken,[token, username], (error, results, fields) => {
							console.log(token);
							res.json({
								msg: "found user!",
								token: token,
								username: req.body.username
							});
						});
				}
			}
	});
	// res.json(req.body);

});

//make a route for create listing
router.get('/createlisting', function (req, res, next) {

});

//make a get route for a single auction's detail page based on id in the url
router.get('/getAuctionItem/:auctionId', function(req, res, next) {
	var theAuctionId = req.params.auctionId;
	var getAuctionQuery = "SELECT * FROM auctions WHERE id = ?";
	connection.query(getAuctionQuery, [theAuctionId], (error, results, fields) => {
		if (error) throw error;
		res.json(results);
	})
});

//create submit_bid path 
router.post('/submitBid', function(req, res, next) {
	res.json(req.body);
})

module.exports = router;
