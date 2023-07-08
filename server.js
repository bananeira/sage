const express = require('express');
const path = require('path');
const app = express();

// this is very bad
if (location.protocol !== 'https:'){
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

app.use(express.static(__dirname + '/dist/sage'));
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/sage/index.html'));
});
app.listen(process.env.PORT || 8080);
