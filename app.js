const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

var teams =
    [{
        "id": 0, "name": "croatia", "is_still_in": true, "matches": [{ "id": 0, "opponent": 1, "outcome": 'W' }]
    }, {
        "id": 1, "name": "russia", "is_still_in": false, "matches": [{ "id": 0, "opponent": 0, "outcome": 'L' }]
    }];

app.set('port', (process.env.PORT || 5000));

app.get('/teams', function (req, res) {
    res.json(teams);
});

function computeMatches() {
    var help = [];
    for (var i = 0; i < teams.length; i++)
        help.push(teams[i].matches);
    return help;
}

app.get('/matches', function (req, res) {
    res.json(computeMatches());
});


app.post('/teams', function (req, res) {
    if (req.body != undefined) {
        if (req.body.name != undefined && req.body.is_still_in != undefined && req.body.matches != undefined && req.body.matches != []) {
            req.body.id = teams.length;
            teams.push(req.body);

        }
        else {
            if (req.body.name != undefined && req.body.is_still_in != undefined) {
                req.body.id = teams.length;
                req.body.matches = [];
                teams.push(req.body);
            }
        }
    }
    else
        res.json({ "error": "missing body" });

    res.json(teams);

});

app.put('/teams', function (req, res) {
    if (req.body != undefined) {
        if (req.body.id != undefined) {
            for (var i = 0; i < teams.length; i++) {
                if (teams[i].id == req.body.id) {
                    teams[i].matches[i] = req.body;
                }
            }
        }
    }
    else
        res.json({ "error": "BODY ERROR!" });
    res.json(teams);
});

app.post('/matches', function (req, res) {
    if (req.body != undefined) {
        if (req.body.idTeam != undefined && req.body.opponent != undefined && req.body.outcome != undefined && (req.body.outcome == 'W' || req.body.outcome == 'D' || req.body.outcome == 'L')) {

            for (var i = 0; i < teams.length; i++) {
                if (teams[i].id == req.body.idTeam) {
                    var match = { "id": teams[i].matches.length, "opponent": req.body.opponent, "outcome": req.body.outcome }
                    teams[i].matches.push(match);
                }
            }
        }
        else {
            return res.json({ "error": "ERROR!" });
        }
    }
    else
        return res.json({ "error": "BODY ERROR!" });

    return res.json(computeMatches());
});

app.put('/matches', function (req, res) {
    if (req.body != undefined) {
        if (req.body.id != undefined) {
            for (var i = 0; i < teams.length; i++) {
                for (var j = 0; j < teams[i].matches.length; j++) {
                    if (teams[i].matches[j].id == req.body.id) {
                        teams[i].matches[i] = req.body;
                    }
                }
            }
        }
    }
    else
        res.json({ "error": "BODY ERROR!" });

    res.json(computeMatches());
});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
