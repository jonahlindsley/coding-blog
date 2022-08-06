const express = require('express');
const app = express();
const db = require('./config/db_connection');
const path = require('path');
const PORT = process.env.PORT || 3006
const api_routes = require('./routes/api_routes');
const {engine} = require('express-handlebars');
const session = require('express-session');


app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/', api_routes);

db.sync({force: false})
.then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
})

