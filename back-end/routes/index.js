var express = require('express');
var router = express.Router();
var config = require('../config/config');
var randtoken = require('rand-token');
var stripe = require('stripe')("sk_test_aqPmqONGQHB62ls1KJKf1VZt"); //our stripe secret key goes here
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
	var selectQuery = "SELECT current_bid, starting_bid FROM auctions where id = ?";
	connection.query(selectQuery, [req.body.auctionItemId], (error, results, fields) => {
		// res.json(results[0]);
		if ((req.body.bidAmount < results[0].currentBid) || (req.body.bidAmount < results[0].starting_bid)) {
			res.json({
				msg: "Bid Too Low!"
			})
		}
		else {
			//bid has passed server validation....it's high enough!  Update mySQL.
			//Update the bid_history table and auctions table
			// auctions table
			// 	-high_bidder_id
			// 	-current_bid
			// bid_history
			// 	-auction_id
			// 	-bidder_id
			// 	-amount

			// update auctions high_bidder_id and bid where auction id = whatever was passed
			var getUserId = "SELECT id FROM users where token = ?";
			connection.query(getUserId, [req.body.userToken], (error2, results2, fields2) => {
				if (results2.length > 0) { //token in the DB, valid token.  Move forward

					var updateAuctionsQuery = "UPDATE auctions SET high_bidder_id=?, current_bid=?" + 
						"WHERE id = ?";
					connection.query(updateAuctionsQuery, [results2[0].id, req.body.bidAmount, req.body.auctionItemId], (error3, results3, fields3) => {
						if (error) throw error;
						res.json({
							msg: "Bid accepted!",
							newBid: req.body.bidAmount
						});
					})

					var insertAuctiontoBidHistory = "INSERT INTO bid_history (auction_id, bidder_id, amount) VALUES (?, ?, ?)";
					connection.query(insertAuctiontoBidHistory, [req.body.auctionItemId, results2[0].id, req.body.bidAmount], (error4, results4, fields4) => {
						if (error) throw error;
						res.json({
							msg: "Inserted into bid history!"
						})
					})
				}
				else {
					res.json({
						msg: "Bad token"
					});
				}
			})

		}
	});
	// res.json(req.body);
});

// get a route for stripe payment processing
router.post('/stripe', function(req, res, next) {
	// run a query against req.body.token to make sure this person is logged in (make a function to check user token?)


	// res.json(req.body);
	stripe.charges.create({
	  amount: req.body.amount,
	  currency: "usd",
	  source: req.body.stripeToken, // obtained with Stripe.js
	  description: "Charge for input email"
	}, function(err, charge) {
	  // asynchronously called
	  if (err) {
	  	res.json({
	  		msg: 'errorProcessing'
	  	})
	  }
	  else {
	  	res.json({
	  		msg: 'paymentSuccess'
	  	})
	  }
	});
});

//make a get route for the user account page
router.get('/account', function(req, res, next) {
	
});

module.exports = router;
