var express = require('express');
var router = express.Router();
var records = require("../ownModules/records.js").records;
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index',{teamDetails:false});
});

router.post('/teamDetails',function(req,res){
	records.validateTeamDetails(function(error,teamDetails){
		if(error) res.render('index',{error:true});
		else res.render('index',{teamDetails:teamDetails})
	});	
});

router.get('/matchDetails',function(req,res){
	var overs = req.query.overs;
	var firstBat = req.query.firstBat;
	records.updateMatchDetails(overs,firstBat,function(){
		res.redirect('/runningMatch');
	});
});

router.get('runningMatch', function(req,res){
	res.render('runningMatch');
});

module.exports = router;
