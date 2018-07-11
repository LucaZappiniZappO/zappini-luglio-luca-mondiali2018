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

app.get('/matches', function (req, res) {
    var help = [];
    for (var i = 0; i < teams.length; i++)
        help.push(teams[i].matches);
    res.json(help);
});


app.post('/teams', function (req, res) {
    console.log(req.body);
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

});

app.post('/matches', function (req, res) {

});

app.put('/matches', function (req, res) {

});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
