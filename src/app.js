"use strict";
require('dotenv').config()
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts')  
const app = express();
const PORT = process.env.PORT || 3000;
const ErrorMiddleware =  require(path.join( __dirname,'./middleware/ErrorMiddleware'));
const JWTAuthMiddleware =  require(path.join( __dirname,'./middleware/JWTAuthMiddleware'));
//api 
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
const authorizationRoutes = require(path.join( __dirname,'./http/api/routes/authorization'));
const apiPetsRoutes = require(path.join( __dirname,'./http/api/routes/petRoutes'));
const apiUsersRoutes = require(path.join( __dirname,'./http/backend/routes/userRoutes'));
app.use('/api/v1/users',JWTAuthMiddleware, apiUsersRoutes)
app.use('/api/v1/pets',JWTAuthMiddleware, apiPetsRoutes)
app.use('/api/v1/auth',authorizationRoutes)
/*backend **/
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.set('views',path.join( __dirname,'./http/backend/views')); 
app.set('view engine', 'ejs'); 
app.use(express.static('public'));
app.set('layout', path.join( __dirname,'./http/backend/views/layout/layout.ejs') )
app.use(expressLayouts)

const backendPetsRoutes      = require(path.join( __dirname,'./http/backend/routes/petRoutes'));
const backendDashboardRoutes = require(path.join( __dirname,'./http/backend/routes/dashboardRoutes'));
app.use('/',backendDashboardRoutes)
app.use('/pets',backendPetsRoutes)
//RUTAS DE ERROR
app.use(ErrorMiddleware);

app.listen(PORT, () => console.log(`json-bread listening on port ${PORT}!`));
