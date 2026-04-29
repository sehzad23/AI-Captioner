const express = require("express")
const authRoute = require("./routes/auth.route")
const postRoute = require("./routes/post.route")
const cookie_parser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookie_parser())

app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

// 🔽 DEBUG MIDDLEWARE (add this)
app.use((req, res, next) => {
  console.log("👉 Incoming:", req.method, req.url);
  next();
});

module.exports = app