const express = require("express");
  const requestRouter= express.Router();
   const {userAuth} = require("../Middlewares/auth.js")
  const ConnectionRequest = require("../models/connectionRequest");
const User= require("../models/user");
// requestRouter.post("/sendConnectionRequest", userAuth,async (req,res)=>
// {
//    const user = req.user;
//   console.log("send a connection request");
//    res.send(user.firstName + "sent the request ");

// });
  
//   module.exports= requestRouter;


requestRouter.post("/request/send/:status/:toUserId", userAuth,async (req,res)=>
{
   try
   {
    const fromUserId= req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
   //check valid status
    const allowedStatus = ["ignore", "interested"];
    if(!allowedStatus.includes(status))
    {
      return res
      .status(400)
      .json({message:"invalid status type" + status});
    }
   //  //prevent sending to yourself
   //  if(fromUserId.toString()===toUserId)
   //  {
   //    return res.status(400).json({message:"you cannot send request to yourself"})
   //  }
     //check if toUserId exists in user collection
    const toUser = await User.findById(toUserId)
     if(!toUser)
    {
     return res.status(404).json({message: "user not found"});
    }
    //if there is an existing ConnectionRequest
    const existingconnectionRequest= await ConnectionRequest.findOne({
      $or:[
            {fromUserId, toUserId} ,
        {fromUserId:toUserId, toUserId:fromUserId}
      ]
      
    });
    
      if (existingconnectionRequest) {
      return res.status(400)
      .json({message: "Connection request already exists between these users" });
    }

    const connectionRequest= new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message:req.user.firstName+"is" +status+ "in" +toUser.firstName,
      data,
    });
}
   catch(err)
   {
      res.status(400).send("error:" + err.message);
   }


});

requestRouter.post("/request/review/:status/:requestId",userAuth, async (req,res)=>

{

 try
{
 const loggedInUser = req.user;
 const {status,requestId} = req.params;
 console.log(status,"status");

 console.log("Logged In User:", loggedInUser._id.toString());
console.log("RequestId:", requestId);

const fullDoc = await ConnectionRequest.findById(requestId);
console.log("Full Document:", fullDoc);

 const allowedStatus = ["accepted", "rejected"];
 if(!allowedStatus.includes(status))
 {
  return res.status(400).json({message:"status is not allowed"});
 }
 const connectionRequest = await ConnectionRequest.findOne({
  _id:requestId,
  toUserId:loggedInUser._id,
  status: "interested",
 });
 if(!connectionRequest)
 {
    return res.status(400).json({message:"connection request not found"});

 }
 connectionRequest.status=status;

 const data = await connectionRequest.save();

 res.json({message:"connection request" +status, data});

//validate the user
 //Ramya =>Sami
 //loggedInId = touserId
 //status= interested
 //requestId should be valid(present in db)


}
catch(err)
{
  res.status(400).send("Error:" +err.message);
}

}

);
  
  module.exports= requestRouter;