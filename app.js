const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const petsRoutes = require('./src/router/petsRoutes');
const PORT = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts')  
app.set('views',path.join( __dirname,'./src/views')); 
app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set("layout", "layouts/layout")
app.use(expressLayouts)

app.use('/pets',petsRoutes)


app.listen(PORT, () => console.log(`json-bread listening on port ${PORT}!`));