const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Connected to database");
    }).catch((err)=>{
        console.error(err);
        console.log("Error Connecting to database");
    })
}

module.exports = dbConnect;