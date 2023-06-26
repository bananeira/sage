
const express = require('express');
const path = require('path');
const {listen} = require("express/lib/application");
const {use} = require("express/lib/router");
const {get} = require("karma/lib/server");

use(express.static(__dirname + '/dist/sage'));
get('/*', function(req, res) {
        res.sendFile(path.join(__dirname+'/dist/sage/index.html'));
    });

listen(process.env.PORT || 8080);
