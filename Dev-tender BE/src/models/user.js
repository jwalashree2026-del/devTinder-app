const mongoose = require("mongoose");
const validator=require("validator");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
//syntax
const userSchema = new mongoose.Schema({ 
    firstName: {
    type: String,
    required:true,
    minlength:4,
    maxlength:50
},
    lastName:{
        type: String
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value)
        {
             if(!validator.isEmail(value)){
             throw new Error("Imvalid email address" + value) ;
}
        }
    },
    password: {
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: `{value} is not a valid gender type`
        }
        },
//         validate(value)
// {
//     if(!["male","female", "other"].includes(value))
//         {
//         throw new Error("Gender data is not valid");
//     }// for existing data or updata data it wont work only for new data insert it works

    photoUrl:{
        type:String,
    },
    about:{
        type:String,
        default:"this is the default of the user",
    },
    skills:{
        type:[String],
    },
},
    {
        timestamps: true,
    }
);
//for "this"  arrow function doesnot works
userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DEV@tinder$207",
        {
            expiresIn: "7d",
        });
        return token;
    
};

userSchema.methods.validatePassword= async function (passwordInputByUser)
{
    const user= this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}

//syntax
const User = mongoose.model("User",userSchema );

module.exports = User;