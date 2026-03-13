// const { model } = require("mongoose");
const validator = require("validator");

const validateSignUpData =(req) =>
{
 const {firstName, lastName, email, password} = req.body;
  if(!firstName||!lastName){
    throw new Error("name is not valid");
  }
 else if(!validator.isEmail(email))
 {
      throw new Error("email is not valid");
}
 else if(!validator.isStrongPassword(password))
 {
      throw new Error("please enter strong password ");
}

};

const validateEditProfileData = (req)=>
{
  const allowedEditFields = [
    "firstName", 
    "lastName",
    "email", 
    "photourl",
    "gender", 
    "age",
     "about",
     "skills"
    ];
  
  const isEditAllowed=Object.keys(req.body).every((field )=>allowedEditFields.includes(field));
  return isEditAllowed;

};
module.exports={
  validateSignUpData,
  validateEditProfileData,
};