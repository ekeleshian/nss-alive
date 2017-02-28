const express = require('express');
const iterate_app = express();

iterate_app.use(express.static('public'));
iterate_app.listen(8080);
