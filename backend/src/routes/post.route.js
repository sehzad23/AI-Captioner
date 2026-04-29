const express = require("express")
const authMiddlerwear = require("../middlerwears/auth.middlerware")
const multer = require("multer")
const { createPostController } = require("../controllers/post.controller")


const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

// ye hamara protected route hoga isliye phele token check karege then token mila to usko verify kare.
router.post("/", authMiddlerwear,upload.single("image"),createPostController)



module.exports = router
