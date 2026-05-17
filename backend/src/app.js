const express = require("express")
const authRoute = require("./routes/auth.route")
const postRoute = require("./routes/post.route")
const cookie_parser = require("cookie-parser")
const cors = require("cors")

const app = express()

// Allow specific origins (supports comma-separated env var)
// const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173,https://ai-rady-caption.vercel.app").split(",").map(s => s.trim())

app.use(cors({
  origin: "https://ai-rady-caption.vercel.app",
  credentials: true
}))
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