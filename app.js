import express from 'express';
const app = express();

app.get('/', function(req, res) {
    res.json({status: "OK"})
})

app.listen(3000, function() {
    console.info(`Server running at http://localhost:3000/`)
})
