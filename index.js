var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//dbconnection
var userdbConnection = require("./Config/userdb").Connect();

//dotenv
require("dotenv/config");

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
var userRoute = require("./Routes/User/index.js");
var todoRouter = require("./Routes/Todo/index.js");
var webHooks = require("./Routes/WebHook/index.js");
var crawler = require("./Routes/Crawler/index.js");

//checking server
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server Running Successfully" });
});

// routes
app.use("/api/v1/todo/user", userRoute);
app.use("/api/v1/todos/", todoRouter);
app.use("/api/v1/webHooks",webHooks);
app.use("/api/v1/crawler",crawler);

//unknown routes
app.use("/*", (req, res) => {
  res.status(404).json({ msg: "Route Not Found" });
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Internal Server Error" });
});


app.listen(process.env.Port_No || 3000, () => {
  console.log(`Server listining @ ${process.env.Port_No}`);
});
