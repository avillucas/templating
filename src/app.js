"use strict";
require('dotenv').config()
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const PORT = process.env.PORT || 3000;
const ErrorMiddleware = require('./middleware/ErrorMiddleware');
const JWTAuthMiddleware = require('./middleware/JWTAuthMiddleware');
//api 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authorizationRoutes = require('./http/api/routes/authRoutes');
const apiPetsRoutes = require('./http/api/routes/petRoutes');
const apiUsersRoutes = require('./http/api/routes/userRoutes');
app.use('/api/v1/users', apiUsersRoutes)
app.use('/api/v1/pets', JWTAuthMiddleware, apiPetsRoutes)
app.use('/api/v1/auth', authorizationRoutes)
//backend *
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.set('views', './http/backend/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('layout', './http/backend/views/layout/layout.ejs');
app.use(expressLayouts)
const backendPetsRoutes = require('./http/backend/routes/petRoutes');
const backendDashboardRoutes = require('./http/backend/routes/dashboardRoutes');
app.use('/', backendDashboardRoutes)
app.use('/pets', backendPetsRoutes)

//RUTAS DE ERROR
app.use(ErrorMiddleware);

app.listen(PORT, () => console.log(`json-bread listening on port ${PORT}!`));
