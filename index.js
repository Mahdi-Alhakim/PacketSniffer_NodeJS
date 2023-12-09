
//Dependencies
var express = require("express");
var router = require("./routes");
var dotenv = require("dotenv");

//SETUP
var app = express();
app.use(express.json());
dotenv.config();

//Routers
app.use("/api/capture", router);

//Listen through Port:
app.listen(process.env.port, () => {
    console.log("Server Up and Running...")
});