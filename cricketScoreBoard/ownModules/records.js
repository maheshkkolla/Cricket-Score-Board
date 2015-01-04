var fs = require("fs");

var records = {};
exports.records = records;

records.validateTeamDetails = function(callback){
	fs.readFile("./public/uploads/teamDetails.txt",function(err,teamDetails){
		try{
			teamDetails = JSON.parse(teamDetails);
		}
		catch(err){
			callback(true);
		}
		if(teamDetails.length == 2 && teamDetails[0].length > 1 && teamDetails[0].length == teamDetails.length)
			callback(false,teamDetails);
		else callback(true);
	});
}