"use strict";

const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    workoutText: {
        type: String,
        required: false
    }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
