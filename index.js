const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


//Creating server
const app = express();


//Connect DB
connectDB(); 

//Able cors
console.log(process.env.FRONTEND_URL)
const corsOptions = {
    origin: process.env.FRONTEND_URL
}
app.use( cors(corsOptions) )

//App port
const port = process.env.PORT || 4000;

//Reading values of a body
app.use(express.json());

//Able PUBLIC
app.use(express.static('uploads'));

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));

//Init app
app.listen(port, '0.0.0.0', () => {
    console.log(`server is running in ${port}`)
})