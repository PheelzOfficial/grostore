const jwt = require("jsonwebtoken");
const accountmodel = require("../models/account")

const verify = async(req, res, next)=>{
    try{
        const token = req.cookies?.grostore_cookie
        if(!token){
            return res.redirect("/login?error=Unauthorized, please login")
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const account = await accountmodel.findById(decoded.id).select("-password")
        req.user = account
        next()
    }catch(err){
        console.log(err)
        const token = req.cookies?.grostore_cookie
        if(token){
            res.clearCookie("grostore_cookie")
        }
        res.redirect("/login?error=Unauthorized, please login")
    }
}

const checkuser = async(req, res, next)=>{
    try{
        const token = req.cookies?.grostore_cookie
        if(!token){
            return next();
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const account = await accountmodel.findById(decoded.id).select("-password")
        req.user = account
        next()
    }catch(err){
        console.log(err)
        next();
    }
}

module.exports = {verify, checkuser};