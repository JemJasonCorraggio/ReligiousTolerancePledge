var express = require('express');
var app = express();
app.use(express.static('Public'));
app.listen(process.env.PORT || 8080);