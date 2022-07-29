const express = require('express');
const app = express();
const ejs = require('ejs');

require("dotenv").config()
require("./config")
require("./core")

require("./actions")

app.set('view engine', ejs)
app.use(express.urlencoded());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// use routers
const loginRouter = require("./routers/login");
app.use(loginRouter)

const usersRouter = require("./routers/usersRouter");
app.use(usersRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))