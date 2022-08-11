const express = require('express');
const app = express();
const db = require('./config/db_connection');
const path = require('path');
const PORT = process.env.PORT || 3006
const api_routes = require('./routes/api_routes');
const {engine} = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes')
const helpers = require('./utils/helpers')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

app.use(express.static(path.join(__dirname, 'public')));


app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');

const sess = {
    secret: 'thisiswords',
    cookie: { maxAge: 36000000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: db
    })
  };

  
app.use(session(sess))
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(routes);

db.sync({force: false})
.then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
})

