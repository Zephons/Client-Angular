const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/Client-Angular'));
ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/Client-Angular/index.html'));
});
ngApp.listen(process.env.PORT || 4201);