const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


// Register API COntroller
async function register_controller(req,res){
      console.log("🔥 API HIT - register");
   const {username, email, password} = req.body
   
   const isuser = await userModel.findOne({username})

   if(isuser){
    return res.status(400).json({
        message: "User is Alrady Exist"
    })
   }

   const newuser = await userModel.create({
    username,
    email,
    password : await bcrypt.hash(password,10)
   })

   const token = jwt.sign({id:newuser._id},process.env.jwt_secrate_key)
   res.cookie("token",token)

   res.status(201).json({
    message: "User Register succusefully",
    user:newuser,
    token: token
   })
}

// Login API COntroller

async function login_controller(req,res){

    const {email,password} = req.body

    const isuseresxist = await userModel.findOne({email})

    if(!isuseresxist){
        return res.status(400).json({
            message:"User dose not exist"
        })
    }

    const ispassword = await bcrypt.compare(password,isuseresxist.password)

    if(!ispassword){
        return res.status(400).json({
            message: "Invalid Credintial"
        })
    }


    const token = jwt.sign({id:isuseresxist._id},process.env.jwt_secrate_key)
     res.cookie("token",token)

     res.status(200).json({
        message: "User Loged in Succesfully",
        user:isuseresxist,
        token: token
     })
}

// Logout API

async function logout_controller(req,res) {
      res.clearCookie("token")

      res.status(200).json({
        message: "Logged out successfully"
      })
}

// Profile API
async function me_controller(req, res) {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password"); // 🔥 password hide

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
}


//Delete API

async function delete_controller(req, res) {
  try {
    const userId = req.user.id; // middleware se aayega

    await userModel.findByIdAndDelete(userId);

    // logout bhi kar dena (cookie clear)
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
}

module.exports = {
    register_controller,
    login_controller,
    logout_controller,
    me_controller,
    delete_controller
}