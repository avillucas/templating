"use strict";
require('dotenv').config()
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts')  
const app = express();
const PORT = process.env.PORT || 3000;
//api 
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
const apiPetsRoutes = require(path.join( __dirname,'./http/api/routes/petRoutes'));
app.use('/api/v1/pets',apiPetsRoutes)
/*backend **/
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.set('views',path.join( __dirname,'./http/backend/views')); 
app.set('view engine', 'ejs'); 
app.use(express.static('public'));
app.set('layout', path.join( __dirname,'./http/backend/views/layout/layout.ejs') )
app.use(expressLayouts)
const backendDashboardRoutes = require(path.join( __dirname,'./http/backend/routes/dashboardRoutes'));
app.use('/',backendDashboardRoutes)
const backendPetsRoutes      = require(path.join( __dirname,'./http/backend/routes/petRoutes'));
app.use('/pets',backendPetsRoutes)


//RUTAS DE ERROR
app.use(async (err, req, res, next) => {
  console.error(err.stack); // Log interno

  const statusCode = err.status || 500;
  const title = err.title || "Error";
  const message =
    err.message || "Se ha generado un error inesperado en el servidor.";

  if (req.originalUrl.startsWith("/api")) {
    return res.status(statusCode).json({
      error: true,
      message,
    });
  }
});

app.listen(PORT, () => console.log(`json-bread listening on port ${PORT}!`));
