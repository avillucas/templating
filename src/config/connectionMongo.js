require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION || 'mongodb://mongo:27017/gdp',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err)
);
module.exports = {
  conn: mongoose
}