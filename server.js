const express = require('express');
const app = express();
const db = require('./config/db_connection');
const path = require('path');
const port = process.env.PORT || 3333
const api_routes = require('./routes/api_routes');


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use('api', api_routes);

db.sync({force: false})
.then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
})