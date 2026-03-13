const express = require('express');// this require is using experss in node modules
const app = express();
const connectDB = require("./config/database.js");

//bcrypt ==it creates hashpassword of the function
const cookieParser = require("cookie-parser")
const cors = require("cors");


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
 app.use(express.json());//middleware
 app.use(cookieParser());//middleware

const authRouter = require("./routes/auth.js");
const profileRouter= require("./routes/profile.js");
const requestRouter= require("./routes/request.js");
const userRouter=require("./routes/user.js");
app.use("/", authRouter);
app.use("/", profileRouter);

app.use("/", requestRouter);
app.use("/", userRouter);


connectDB()
.then(()=>
{
 console.log("database connection established");
 app.listen(4444 , ()=>
 {
    console.log("server is running and running on port 4444")
  }); //lisytening

})
.catch(err =>
{
    console.error("database cannot be established")
}
);







// app.get("/user", (req,res,next)=>
// {
//     console.log("handling the roiute user 1");
//     res.send("1st route handler");
// });

// app.get("/user", (req,res,next)=>
// {
//     console.log("handling the roiute user 2");
//     next();
// });


//handle Auth Middleware for all GET, POST,  ....request
// app.use("/admin", adminAuth);

// app.post("/user/login",(req,res)=>
// {
//     res.send("user logged in successfully");
// })

// app.post("/user/data",userAuth,(req,res)=>
// {
//     res.send("user logged in successfully");
// })
// app.get("/admin/getAllData", (req,res)=>
// {
 
    
//  res.send("All data sent ");
//   } );

  
//   app.get("/user",userAuth, (req,res)=>
// {
 
//     res.send("user data sent ");
//   } );


// app.get("/admin/deleteAllData", (req,res)=>
// {
//     res.send("All data delete ");
// });




