const User = require("../models/User")

const router = require("express").Router()

router.get('/', (req, res) => {
    res.render('login.ejs')
})

router.post("/api/auth/login",async (req, res) => {
    const {login, password} = req.body
    const users = await User.find()

    if(login && password){
        if(login == process.env.LOGIN && password == process.env.PASSWORD){
            res.render("index.ejs"
            , {users, admin: {login, password}}
            )
        }else{
            res.send("Login yoki parol tasdiqlanmadi")
        }
    }else{
        res.send("Login yoki parol kiritilmadi")
    }
})

module.exports = router