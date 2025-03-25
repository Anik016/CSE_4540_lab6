var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User');
var jwt = require('jsonwebtoken');
require('dotenv').config();

var app = express();

// using cors
app.use(cors());

// body parser
app.use(bodyParser.json());

// database connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
    if (err) {
        console.log("DB connection failed!!");
        console.log(err);
    } else {
        console.log("DB connected!");
    }
});

// register
app.post('/register', function(req, res) {
    var userData = req.body;
    
    var newUser = new User({
        name: userData.name,
        email: userData.email,
        pass: userData.pass
    });

    newUser.save(function(err) {
        if (err) {
            res.status(400).send("Error saving user: " + err);
        } else {
            res.status(201).send("User created");
        }
    });
});

// login
app.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.pass;

    User.findOne({email: email}, function(err, user) {
        if (err) {
            return res.status(400).send("Error finding user");
        }
        
        if (!user || user.pass !== password) {
            return res.status(401).send("Wrong email or password!!");
        }

        var token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({token: token});
    });
});

// get users
app.get('/users', function(req, res) {
    var token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).send("Need a token!!");
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(403).send("Bad or old token!!");
        }
        
        User.find({}, function(err, users) {
            if (err) {
                res.status(400).send("Error getting users: " + err);
            } else {
                res.json(users);
            }
        });
    });
});

// start server
var PORT = 3000;
app.listen(PORT, function() {
    console.log("Server is working on port " + PORT);
});
