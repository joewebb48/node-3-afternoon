const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

const checkForSession = require('./middlewares/checkForSessions');

const ac = require('./controllers/auth_controller');
const swag_controller = require('./controllers/swag_controller');
const cc = require('./controllers/cart_controller');
const sc = require('./controllers/search_controller');

const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

//SWAG
app.get(`/api/swag`, swag_controller.read);

//AUTH
app.post(`/api/login`, ac.login);
app.post(`/api/register`, ac.register);
app.post(`/api/signout`, ac.signout);
app.get(`/api/user`, ac.getUser);

//CART
app.post(`/api/cart`, cc.add);
app.post(`/api/cart/checkOut`, cc.checkOut);
app.delete(`/api/cart`, cc.delete);

//SEARCH
app.get(`/api/search`, sc.search);

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`knock knock... who's there... PORT ${PORT}`);
});
