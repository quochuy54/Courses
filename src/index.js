const path = require('path')
const express = require('express')
const morgan = require('morgan')
const session = require('express-session');
const handlebars  = require('express-handlebars');
const methodOverride = require('method-override')
const route = require('./routes/index');
require('dotenv/config');
const app = express()
const port = 3000

//session to login
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 3600000*2 // 2 hours
  }
}));

const SortMiddleware = require('./app/Middlewares/SortMiddleware')

const db = require('./config/db/index');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true})) //body

// Set POST to PUT
app.use(methodOverride('_method'))

//logger HTTP
app.use(morgan('combined'))

//Custom Middleware
app.use(SortMiddleware)
// Send user data to UI when logined
app.use((req, res, next) => {
  if(req.session.user){
    let user = {email: req.session.user.email};
    res.locals.user = user;
  }
  next();
});

// Template Engine
app.engine('hbs', handlebars(
  {
    extname: '.hbs',
    helpers: {
      sum(a,b) {return a+b},
      sortable: (field, sort) => {

        const sortType = field === sort.column ? sort.type : 'default'

        const icons = {
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending',
        }

        // reset type chuan bi de thay doi icon cho request tiep theo
        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        }

        const icon = icons[sortType]
        const type = types[sortType]

        return `<a href="?_sort&column=${field}&type=${type}">
                  <span class="${icon}"></span>
                </a>`
      }
  }
  }
));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'))


db.connect();
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
