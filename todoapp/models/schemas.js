var mongoose=require("mongoose");

var schema=new mongoose.Schema({
  item:String



})
module.exports=mongoose.model("Item",schema);
