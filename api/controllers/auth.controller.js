import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async(req,res)=>{
    
    console.log('inside register user function')
    res.status(200).send("Register User function")
})
const loginUser = asyncHandler(async(req,res)=>{
    console.log('inside login user function')
    res.status(200).send("login User function")
})
const logoutUser = asyncHandler(async(req,res)=>{
    console.log('inside logout user function')
    res.status(200).send("logout User function")
})



export  {registerUser,loginUser,logoutUser}