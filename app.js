const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.get('/count', function (req, res) {

});

app.get('/sum', function (req, res) {

});

app.post('/check', function (req, res) {

});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

function validInt(value) {
    if (arguments.length !== 1)
        return false;
    if (value instanceof Array)
        return false;
    if (value === Infinity || value === -Infinity)
        return true;
    if (isNaN(value))
        return false;
    if (isNaN(parseInt(value)))
        return false;
    if (parseInt(Number(value)) !== value)
        return false;
    return true;
}
