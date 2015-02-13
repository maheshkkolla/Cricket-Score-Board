var fs = require("fs");

var records = {};
exports.records = records;

var battingData = fs.readFileSync("./data/battingData.json");
var bowlingData = fs.readFileSync("./data/bowllingData.json");
var matchSummary = fs.readFileSync("./data/summary.json");
var teamDetails;

var parseUploadedFileData = function(teamData) {
	try {
		teamDetails = JSON.parse(teamData);
	}
	catch(err) {
		return 0;
	}
	return 1;
}

var getTeamNamesFrom = function(teamDetails) {
	return Object.keys(teamDetails);
}

var hasTwoTeams = function(teamNames) {
	return(teamNames.length == 2);
}

records.validateTeamDetails = function(callback){
	fs.readFile("./public/uploads/teamDetails.txt",function(err,teamData){
		parseUploadedFileData(teamData) || callback(true);
		var teamNames = getTeamNamesFrom(teamDetails);
		if(hasTwoTeams(teamNames)){
			var teamDetailsToDisplay = [teamNames, teamDetails[teamNames[0]], teamDetails[teamNames[1]]]
			callback(false,teamDetailsToDisplay);
		}
		else callback(true);
	});
}

var getSecondBatTeam = function(firstBatTeam) {
	var teamNames = getTeamNamesFrom(teamDetails);
	if(teamNames[0] == firstBatTeam)return teamNames[1]
	else return teamNames[0]
}

var intializeBattingData = function(teamName) {
	battingData[teamName] = {};
	teamDetails[teamName].forEach(function(player){
		battingData[teamName][player] = { "score":0, "balls":0,
			"boundaries":{ "4":0, "6":0 }, "strikerate":0, "out":{ "who":0, "how":0, "by":0 }
		};
	});
}

var getSummaryObjectForamt = function(){
	return {"score":0, "boundaries":{"4":0,"6":0}, 
		"extras":{"nobs":0, "wides":0}, "wickets": 0};
}

var intializeBowllingData = function(teamName) {
	bowllingData[teamName] = {};
	for(var over = 1; over <= noOfOvers; over++){
		bowllingData[teamName][over] = { "summary": getSummaryObjectForamt() };
	}
}

var initializeSummary = function(firstBatTeam, secondBatTeam) {
	summary[firstBatTeam] = getSummaryObjectForamt();
	summary[secondBatTeam] = getSummaryObjectForamt();
}

records.updateMatchDetails = function(noOfOvers,firstBatTeam,callback) {
	var secondBatTeam = getSecondBatTeam(firstBatTeam);
	intializeBattingData(firstBatTeam);
	intializeBattingData(secondBatTeam);
	intializeBowllingData(secondBatTeam, noOfOvers);
	intializeBowllingData(firstBatTeam, noOfOvers);
	initializeSummary(firstBatTeam, secondBatTeam);
	callback();
}