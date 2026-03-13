const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({


fromUserId: {
             type: mongoose.Schema.Types.ObjectId,
             ref:"User",// reference to the user collection fetch full document
             required: true,
},
toUserId: {
             type: mongoose.Schema.Types.ObjectId,
               ref:"User",
             required: true,

},
status:{
         type:String,
         required: true,
         enum:{
            values:  ["ignore", "interested", "accepted", "rejected"],
            message: `{VALUE}  is incorrect status type}`
         },
},
},

    {timestamps:true}
);
//whenever we call this connectionRequest.save()=> it call this function
// ✅ Modern middleware (NO next)
connectionRequestSchema.pre("save", async function ()
{
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("Cannot send request to yourself");
  }
});






 const ConnectionRequestModel=new mongoose.model(
   "ConnectionRequest" ,connectionRequestSchema
);

module.exports = ConnectionRequestModel;