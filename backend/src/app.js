const express = require("express")
const authRoute = require("./routes/auth.route")
const postRoute = require("./routes/post.route")
const cookie_parser = require("cookie-parser")
const cors = require("cors")

const app = express()

// Allow specific origins (supports comma-separated env var)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173,https://ai-caption-generation.vercel.app,https://ai-rady-caption.vercel.app,https://ai-captioner-507f.onrender.com").split(",").map(s => s.trim());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookie_parser())

app.get("/test-auth", (req, res) => {
  res.json({
    cookies: req.cookies,
    token: req.cookies.token || null,
    rawCookie: req.headers.cookie || null,
  });
});

app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

// 🔽 DEBUG MIDDLEWARE (add this)
app.use((req, res, next) => {
  console.log("👉 Incoming:", req.method, req.url);
  next();
});

module.exports = app