const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../Middlewares/auth.js");
const ConnectionRequest= require("../models/connectionRequest");
const User = require("../models/user.js");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills status";
//sending different users request to one person login with diff users and request for one person
userRouter.get("/user/requests/received", userAuth, async (req, res)=>
{
    //"find" returns array and "findone" returns one object
//Get all the pending connection request for the loggedIn user
    try{
        const loggedInUser = req.user;
                console.log("Logged-in user ID:", loggedInUser._id);

         const connectionRequests = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
         }).populate("fromUserId", ["firstName" ,"lastName" ,"email"]); // optional: get s


             // log to console
        console.log("Received requests for:", loggedInUser.firstName);
        console.log(connectionRequests);


         res.json({
            message: "data fetched successfully",
            data: connectionRequests,
         });
    }
    catch(err)
    {
        res.status(400).send("ERROR:" + err.message);
    }
});



userRouter.get("/user/connections", userAuth, async (req, res)=>
{
    
    try{
         const loggedInUser = req.user;

         const connectionRequests = await ConnectionRequest.find({
            $or:[
           {toUserId:loggedInUser._id, status:"accepted"},
           {fromUserId:loggedInUser._id, status:"accepted"},
        ],
    }).populate("fromUserId", USER_SAFE_DATA)// optional: get s
    .populate("toUserId", USER_SAFE_DATA);

console.log(connectionRequests);

     const data = connectionRequests.map((row)=>{
        if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
             return row.toUserId;   // if I sent request
    } else {
        return row.fromUserId; // if I received request
    }    
            
    //         otherUser = row.toUserId;
    // } else {
    //     otherUser = row.fromUserId;
    // }

    // return {
    //     _id: otherUser._id,
    //     firstName: otherUser.firstName,
    //     lastName: otherUser.lastName
    // };
   
    });
         res.json({data });
        }
     catch(err)
    {
        res.status(400).send("ERROR:" + err.message);
    }
});

// userRouter.get("/feed", userAuth, async(req,res)=>
// {
//     try{

//     //user should see all the user cards except
//     // * his own card
//     //* his connections
//     //* already sent the connection request
//     //* ignored people

//     const loggedInUser= req.user;


// // find all connection request (sent + recieved)
//     const connectionRequests = await ConnectionRequest.find({
//        $or: [{ fromUserId:loggedInUser._id},{toUserId: loggedInUser._id} ],
//     }).select("fromUserId  toUserId")
//    // .populate("fromUserId", "firstName")
//    // .populate("toUserId", "firstName")

//   const hideUsersFromFeed = new Set();
//   connectionRequests.forEach(req =>
//   {
//     hideUsersFromFeed.add(req.fromUserId.toString());
//     hideUsersFromFeed.add(req.toUserId.toString());
//  });
//  console.log(hideUsersFromFeed);
//  // "Give me all users whose ID is NOT IN this hide list."
//  const users = await User.find({
//     $and:[
//    {_id:{ $nin: Array.from(hideUsersFromFeed)}},//not in
//    {_id:{  $ne: loggedInUser._id}},//not equal to
// ]
//  }).select(USER_SAFE_DATA);


//     res.send(users);
//     }
//     catch(err)
//     {
//         res.status(400).json({message: err.message});
//     }
// });

// module.exports = userRouter;


userRouter.get("/feed", userAuth, async(req,res)=>
{
      console.log("Cookies:", req.cookies);
        console.log("Logged in user:", req.user);

    try{

    //user should see all the user cards except
    // * his own card
    //* his connections
    //* already sent the connection request
    //* ignored people

    const loggedInUser= req.user;

    const page = parseInt(req.query.page) ||1;
    let limit = parseInt(req.query.limit) ||10;
    limit= limit>50 ? 50 : limit;
    const skip = (page-1)* limit;



// find all connection request (sent + recieved)
    const connectionRequests = await ConnectionRequest.find({
       $or: [{ fromUserId:loggedInUser._id},{toUserId: loggedInUser._id} ],
    }).select("fromUserId  toUserId")
   // .populate("fromUserId", "firstName")
   // .populate("toUserId", "firstName")

  const hideUsersFromFeed = new Set();
  connectionRequests.forEach(req =>
  {
    hideUsersFromFeed.add(req.fromUserId.toString());
    hideUsersFromFeed.add(req.toUserId.toString());
 });
 console.log(hideUsersFromFeed);
 // "Give me all users whose ID is NOT IN this hide list."
 const users = await User.find({
    $and:[
   {_id:{ $nin: Array.from(hideUsersFromFeed)}},//not in
   {_id:{  $ne: loggedInUser._id}},//not equal to
]
 }).select(USER_SAFE_DATA)
 .skip(skip)
 .limit(limit);


    res.json({data:users});
    }
    catch(err)
    {
        res.status(400).json({message: err.message});
    }
});

module.exports = userRouter;