const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/client-angular'));
ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/client-angular/index.html'));
});
ngApp.listen(process.env.ANGULAR_PORT || 4200);