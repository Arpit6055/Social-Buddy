const express = require('express')
const app = express()
require('dotenv').config();
var helmet = require('helmet');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const port = process.env.PORT || 3000
// DB Config
const connectDB = require('./_helper/db.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'))
app.use(helmet());


connectDB();

//routes
app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
});
app.use('/api/users/', require('./routes/user.routes'));
app.use('/api/auth/', require('./routes/auth.routes'));


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))