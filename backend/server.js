
require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/db/db")

connectDB()

app.get("/whoami", (req, res) => {
  console.log("🔥 WHOAMI HIT");
  res.send("THIS IS MY CURRENT SERVER");
});

app.listen(8000,()=>{
    console.log("The server is Running on port 8000")
})