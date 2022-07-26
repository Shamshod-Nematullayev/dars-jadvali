const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO)
    .then(()=> console.log(`We are succesful connect to mongodb`))
    .catch(err => {
        console.log('An error occured than connect mongodb...', err);
    })

    