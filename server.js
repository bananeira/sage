const sslRedirect = require('heroku-ssl-redirect');
const app = express();

const express = require('express');
const path = require('path');

app.use(express.static(__dirname + '/dist/sage'), sslRedirect());
app.get('/*', function(req,res) {
        res.sendFile(path.join(__dirname+'/dist/sage/index.html'));
    });

app.listen(process.env.PORT || 8080);
