"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var helmet = require("helmet");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(helmet());
app.set('json spaces', 2);
app.get('/generate', function (req, res) {
    res.json({ message: 'success' });
});
app.use('/*', function (req, res) {
    res.status(404).send({});
});
exports.default = app.listen(PORT, function () {
    console.log('listening on port', PORT, '...');
});
// 2 routes for V1
// Get entry
// POST entry
// PUT entry
// delete entry
// GET user
// POST user
// PUT user
// delete user
