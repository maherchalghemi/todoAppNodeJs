var express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());
const auth = require('./Server/Routings/auth');
app.use('/auth', auth);

const user = require('./Server/Routings/user')
app.use('/user', user);

const todo = require('./Server/Routings/todo')
app.use('/todo',todo);

app.get('/', function (req, res) {
    res.send('Hello World')
})


app.listen(3000, err => { console.log("server listening on port 3000") });