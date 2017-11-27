var express=require("express");
var router=express.Router();
var mongoose=require("mongoose");
var mongodb=require("mongodb");
var bcrypt=require("bcrypt");
var bodyParser=require("body-parser");
var urlencoded=bodyParser.urlencoded({extended:true});
mongoose.connect("mongodb://saif:saif308@ds227865.mlab.com:27865/todostest");
var userschema=new mongoose.Schema({
  username:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String,
    bcrypt:true
  }
});
userschema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};
var User=module.exports=mongoose.model("Users",userschema);
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}
module.exports.getUserById=function(id,callback){
  User.findById(id,callback);
}


module.exports.createUser=function(newUser,callback){
  bcrypt.genSalt(10,function(err,salt){
    if (err) throw err;
    bcrypt.hash(newUser.password,salt,function(err,hash){
      if(err) throw err;
      newUser.password=hash;
      newUser.save(callback);
    });
  });

};
