const mongoose = require("mongoose")


function connectDB() {
    mongoose.connect(process.env.MONGO_DB_URL)
    .then(()=>{
        console.log("Connectd to DB")
    })
    .catch((err)=>{
        console.log("Not Connected to DB",err)
    })
}module.exports = connectDB