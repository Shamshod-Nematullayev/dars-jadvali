const { Markup } = require("telegraf");
const { bot } = require("../core/bot");
const User = require("../models/User");
const path = require('path');

bot.start(async ctx => {
    const users = await User.find()
    let keyboardItems = []
    function formatter(user){       
        function formatText(weekDay){
            let splitedText =  weekDay.split(' ')
            let universalText ="";
            for(let i = 0; i<splitedText.length; i++){
                if(splitedText[i] !==""){
                    universalText +='|'+splitedText[i]
                }
            }
            if(splitedText[0]!=''){
                universalText+='|'
            }
            return universalText
        }
        return {
            Monday: formatText(user.Monday),
            Tuesday: formatText(user.Tuesday),
            Wednesday: formatText(user.Wednesday),
            Thusday: formatText(user.Thusday),
            Friday: formatText(user.Friday),
            Saturday: formatText(user.Saturday),
            Sunday: formatText(user.Sunday),
        }
    }
    users.forEach(user => {
        keyboardItems.push([Markup.button.callback(user.name, 'teacher_'+ user._id)])
        bot.action('teacher_'+user._id, msg => {
            let week = formatter(user)
            msg.replyWithHTML(`<b><a href="https://t.me/Yangi_Avlod_Academy">Yangi Avlod</a></b>

<b>${user.name}</b>
+998 ${user.phone}

Dushanba: <b>${week.Monday}</b>
Sechanba: <b>${week.Tuesday}</b>
Chorshanba: <b>${week.Wednesday}</b>
Payshanba: <b>${week.Thusday}</b>
Juma: <b>${week.Friday}</b>
Shanba: <b>${week.Saturday}</b>
Yakshanba: <b>${week.Sunday}</b>

<i>powered by <a href="https://t.me/oliy_ong">Oliy_Ong</a></i>`, { disable_web_page_preview: true })

            
        })
    })
    keyboardItems.push([Markup.button.callback("Hammasi", 'all')])
    bot.action('all', msg=> {
        let pdf = path.join(__dirname, '../public/uploads', 'demopdf.pdf')
        ctx.telegram.sendDocument(msg.chat.id, { source: pdf }, {caption: "Umumiy dars jadvali"})
           
    })
    const keyboard = Markup.inlineKeyboard(keyboardItems)

    ctx.reply("Qaysi o'qituvchini darslar jadvali haqida ma'lumot olmoqchisiz?", keyboard)
})