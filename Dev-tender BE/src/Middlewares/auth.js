
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async (req,res, next)=>
{
try
{
    // read the token from the req cookies

 const {token} = req.cookies;

         // If token missing

if(!token)
{
    throw new Error("token is not valid");
}
        // Verify token

 const decodedObj= await jwt.verify(token, "DEV@tinder$207");//this decoded is for verify token

 console.log(req.cookies);
 const {_id} = decodedObj;
         // Find user

 const user = await User.findById(_id);
 if(!user)
 {
     throw new Error("user not found");
 }
 req.user=user;
 next();
}
catch(err)
{
res.status(400).send(err.message);
}
    //validate the token
    //find the user
};
// module.exports = { adminAuth, userAuth };
         
module.exports = { userAuth };