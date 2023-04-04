require("dotenv").config({override:true});

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./app/router/index");
const {notFound, errorCollector} = require("./app/utils/errorHandler");
const PORT = process.env.PORT;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const http = require("http");
const https = require("https");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./app/utils/swagger.json");
const swaggerUiOptions = {
	explorer: true
}
/*
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
*/
app.use((req, res, next) => {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// secure true + sameSite none to allow the client to retrieve cookies
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            sameSite: "lax",
            maxAge : 3600*60*60
        }
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));
app.use(router);

app.use(notFound);

app.use(errorCollector);


// remove comment if in development


app.listen(PORT, () => {
    console.log(`API Server started on ${PORT}`);
});



// IN PROD
// server running on port 8080 for redirection
/*
http.createServer(app).listen(8080);

https.createServer(
    {
        key: fs.readFileSync('//'),
        cert: fs.readFileSync('//'),
        ca: fs.readFileSync('//')
    },
    app
).listen(4443, () => {
    console.log("Listening on PORT : 4443");
});

*/