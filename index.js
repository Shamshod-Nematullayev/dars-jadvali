const express = require('express');
const app = express();
const ejs = require('ejs');
const User = require('./models/User');
3
require("dotenv").config()
require("./config")

app.set('view engine', ejs)
app.use(express.urlencoded());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.render('login.ejs')
})

app.post("/api/auth/login",async (req, res) => {
    const {login, password} = req.body
    console.log(req.body);
    const users = await User.find()

    if(login && password){
        if(login == process.env.LOGIN && password == process.env.PASSWORD){
            res.render("index.ejs"
            , {users}
            )
        }else{
            res.send("Login yoki parol tasdiqlanmadi")
        }
    }else{
        res.send("Login yoki parol kiritilmadi")
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))