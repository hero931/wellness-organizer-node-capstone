"use strict";

const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    progressText: {
        type: String,
        required: false
    }
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
