var path = require('path');
var friends =require('../data/friends.js');

module.exports = function(app) {
    app.get('/api/friends', function(req, res){
        res.json(friends);
    });

    app.post('/api/friends', function(req, res){
        var userInput = req.body;
        var userResponses = userInput.scores;

        var matchName = '';
        var matchImage = '';
        var totalDifference = 10000; 

        for (var i = 0; i < friends.length; i++) {

            var diff = 0;
            for (var f = 0; f < userResponses.length; f++){
            diff += Math.abs(friends[i].scores[f] - userResponses[f]);
            }

            if (diff < totalDifference) {
                totalDifference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        friends.push(userInput);
        res.json({status: 'ok', matchName: matchName, matchImage: matchImage });
    });
}