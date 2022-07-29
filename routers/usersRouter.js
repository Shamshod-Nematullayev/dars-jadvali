const User = require("../models/User")
var pdf        = require('html-pdf');
var fs         = require('fs');
var options    = {
    format:'Tabloid',
    "height": "8in",        // allowed units: mm, cm, in, px
    "width": "10.5in",   
};
const router = require("express").Router()

router.get("/pdf",async (req, res) => {
    const data = await User.find()
    res.render('demopdf.ejs',{data})
})
router.post("/users",async (req, res) => {
    let {users, admin} = req.body
    if(admin.login == process.env.LOGIN && admin.password == process.env.PASSWORD){
        
    let exp;
    let i = 0

    save(users)
    async function save(){
        let data =  users[i]

        const user = await User.findOne({order: data.order})

        if(user){
            user.updateOne({$set: data}).then(()=>{
                i++
                if(i < users.length) save(users)
            }
            )
        }else{
            await new User(data).save().then(()=>{
                i++
                if(i < users.length) save(users)
            })
            exp = true
        }
     }
     const dataAny = await User.find()
     res.render('demopdf.ejs',{data: dataAny},function(err,html){
        pdf.create(html, options).toFile('./public/uploads/demopdf.pdf', function(err, result) {
            if (err){
                return console.log(err);
            }
             else{
                if(exp){
                    res.send("Yangilandi va Yangilari qo'shildi")
                }else{
                    res.send("Yangilandi")
                }
             }
          });
    })
    }else{
        res.send("Siz admin emassiz")
    }

   
})


module.exports = router