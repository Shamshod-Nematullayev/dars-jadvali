const {Telegraf} = require("telegraf")

const bot = new Telegraf(process.env.TOKEN)

bot.catch((err) => {
    console.log(err);
})
bot.launch()
.then(()=> {
    console.log('We are successfull connect to bot');
})
.catch(()=> {
    console.log('An arror occured then connet to bot');
})

module.exports = {bot}