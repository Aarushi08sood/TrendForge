const express = require('express');
// const cors = require('cors');
const dotenv = require("dotenv");
const databaseConnection = require("./config/database.js");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/auth");



dotenv.config({
    path:".env"
})
databaseConnection();
const app = express(); 

app.use(express.urlencoded({
    extended:true
}));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",userRoute);

app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
})
