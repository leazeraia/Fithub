require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const router = require("./app/router");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`API Server started on http://localhost:${PORT}/`)
});