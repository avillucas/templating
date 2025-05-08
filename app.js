"use strict";
require('dotenv').config()
const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts')  
const app = express();
const PORT = process.env.PORT || 3000;
//api 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const apiPetsRoutes = require(path.join( __dirname,'./src/http/api/routes/petRoutes'));
app.use('/api/v1/pets',apiPetsRoutes)
/*backend 
app.set('views',path.join( __dirname,'./src/http/backend/views')); 
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('layout', path.join( __dirname,'./src/http/backend/views/layout/layout.ejs') )
app.use(expressLayouts)
const backendDashboardRoutes = require(path.join( __dirname,'./src/http/backend/routes/dashboardRoutes'));
app.use('/',backendDashboardRoutes)
//const backendPetsRoutes      = require(path.join( __dirname,'./src/http/backend/routes/petRoutes'));
//app.use('/pets',backendPetsRoutes)
*/
app.listen(PORT, () => console.log(`json-bread listening on port ${PORT}!`));