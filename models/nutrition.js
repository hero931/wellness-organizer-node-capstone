"use strict";

const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    nutritionText: {
        type: String,
        required: false
    }
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;
