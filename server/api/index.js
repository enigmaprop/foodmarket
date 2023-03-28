require('dotenv').config({path:'../.env'});

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const app = express();
const cors = require('cors');

mongoose.connect(process.env.DBURL);

app.use(express.urlencoded({ extended: true }));
app.use('/images' , express.static('public'));



// Add Helmet middleware to set security headers
app.use(helmet());

// Use Helmet's cross-site scripting (XSS) filter
app.use(helmet.xssFilter());

// Use Helmet's content security policy (CSP)
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'", 'data:', 'http://localhost:3000'] ,
  }
}));

// Use Helmet's HTTP Strict Transport Security (HSTS)
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));

const whitelist = ['http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
}));

const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/orders', orderRoutes);

const categoryRoutes = require('./routes/catagoryRoutes');
app.use('/categories', categoryRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const discountRoutes = require('./routes/discountRoutes');
app.use('/discount', discountRoutes);

const pointRoutes = require('./routes/pointRoutes');
app.use('/points', pointRoutes);

const newsRoutes = require('./routes/newsRoutes');
app.use('/news', newsRoutes);

app.listen(process.env.SERVERPORT, console.log(`The app is listening on port ${process.env.SERVERPORT}`));
