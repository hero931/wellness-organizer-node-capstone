const User = require('./models/user');
const Nutrition = require('./models/nutrition');
const Workout = require('./models/workout');
const Progress = require('./models/progress');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const moment = require('moment');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.Promise = global.Promise;

// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;

function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}

// ---------------USER ENDPOINTS-------------------------------------
// POST -----------------------------------
// creating a new user
app.post('/users/create', (req, res) => {
    let userName = req.body.userName;
    userName = userName.trim();
    let firstName = req.body.firstName;
    firstName = req.body.firstName;
    let password = req.body.password;
    password = password.trim();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            User.create({
                userName,
                firstName,
                password: hash,
            }, (err, item) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }
                if (item) {
                    console.log(`User \`${userName}\` created.`);
                    return res.json(item);
                }
            });
        });
    });
});

// signing in a user
app.post('/users/signin', function (req, res) {
    const user = req.body.username;
    const pw = req.body.password;
    console.log(pw, user);
    User
        .findOne({
            userName: req.body.username
        }, function (err, items) {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            if (!items) {
                // bad username
                return res.status(401).json({
                    message: "Not found!"
                });
            } else {
                items.validatePassword(req.body.password, function (err, isValid) {
                    if (err) {
                        console.log('There was an error validating the password.');
                    }
                    if (!isValid) {
                        return res.status(401).json({
                            message: "Not found"
                        });
                    } else {
                        var logInTime = new Date();
                        console.log("User logged in: " + req.body.username + ' at ' + logInTime);
                        return res.json(items);
                    }
                });
            };
        });

});


// POST
// creating a new nutrition
app.post('/nutrition/create', (req, res) => {

    let nutritionText = req.body.nutritionTextarea;
    let username = req.body.username;
    Nutrition.create({
        username,
        nutritionText,
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            console.log(`Nutrition added.`);
            return res.json(item);
        }
    });
});

//GET
app.get('/nutrition/get/:user', function (req, res) {
    Nutrition
        .find({
            username: req.params.user
        })
        .then(function (nutritions) {
            res.json({
                nutritions
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

//POST
//creating a new workout
app.post('/workout/create', (req, res) => {

    let workoutText = req.body.workoutTextarea;
    let username = req.body.username;
    Workout.create({
        username,
        workoutText,
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            console.log(`Workout added.`);
            return res.json(item);
        }
    });
});

//GET
app.get('/workout/get/:user', function (req, res) {
    Workout
        .find({
            username: req.params.user
        })
        .then(function (workouts) {
            res.json({
                workouts
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// POST
// creating a new progress
app.post('/progress/create', (req, res) => {

    let progressText = req.body.progressTextarea;
    let username = req.body.username;
    Progress.create({
        username,
        progressText,
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            console.log(`Progress added.`);
            return res.json(item);
        }
    });
});

//GET
app.get('/progress/get/:user', function (req, res) {
    Progress
        .find({
            username: req.params.user
        })
        .then(function (progresses) {
            res.json({
                progresses
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});


// DELETE ----------------------------------------
// deleting a nutrition by id
app.delete('/nutrition/:id', function (req, res) {
    Nutrition.findByIdAndRemove(req.params.id).exec().then(function (nutrition) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// DELETE ----------------------------------------
// deleting a workout by id
app.delete('/workout/:id', function (req, res) {
    Workout.findByIdAndRemove(req.params.id).exec().then(function (workout) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// DELETE ----------------------------------------
// deleting a progress by id
app.delete('/progress/:id', function (req, res) {
    Progress.findByIdAndRemove(req.params.id).exec().then(function (progress) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});



// MISC ------------------------------------------
// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
