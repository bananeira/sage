const express = require('express');
const path = require('path');
var enforce = require('express-sslify');
const http = require("http");
const app = express();

app.use(express.static(__dirname + '/dist/sage'), enforce.HTTPS());
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/sage/index.html'));
});
app.listen(process.env.PORT || 8080);
