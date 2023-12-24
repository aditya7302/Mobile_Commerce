const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');

//dotenv config
dotenv.config();

connectDB();

//rest object;
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
app.use('/api/v1/test', require('./routes/testRoute'));
app.use('/api/v1/auth' ,require('./routes/authRoute'));
app.use("/api/v1/product", require('./routes/productRoute'));

//server
app.listen(process.env.PORT, () => {
    console.log(`The server is running on port : ${process.env.PORT} in ${process.env.DEVELOPMENT_MODE}`.bgGreen.black);
})

