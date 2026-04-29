const express = require("express")
const {register_controller,login_controller,logout_controller,me_controller,delete_controller} = require("../controllers/auth.controller")
const authMiddlerwear = require("../middlerwears/auth.middlerware")

const router = express.Router()

router.post("/register",register_controller)
router.post("/login",login_controller)
router.get("/logout",logout_controller)
router.get("/me",authMiddlerwear,me_controller)
router.delete("/delete",authMiddlerwear, delete_controller)

module.exports = router