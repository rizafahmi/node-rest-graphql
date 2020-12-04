import express from 'express';
import bodyParser from 'body-parser';

import router from './router.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.json({status: "OK"})
})
app.use(router);

app.listen(3000, function() {
    console.info(`Server running at http://localhost:3000/`)
})
