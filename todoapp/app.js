var express=require("express");
var app=express();
var mongodb=require("mongodb");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/testentry");

var userschema=new mongoose.Schema({

name:{
  type:String
}

});
var User=mongoose.model("User",userschema);
var saveentry=User({name:"saif raza"}).save(function(err){
  if (err) throw err;
  console.log("successfully save");
})
