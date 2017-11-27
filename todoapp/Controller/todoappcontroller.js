var mongoose=require("mongoose");

var bodyparser=require("body-parser");

var Item=require("../models/schemas");
mongoose.connect("mongodb://saif:saif308@ds227865.mlab.com:27865/todostest");
var urlencoddedparser=bodyparser.urlencoded({extended:false});
module.exports=function(app){

app.get("/todo",function(req,res){

Item.find({},function(err,data){
  if (err) throw err;
  else{
    res.render("todo2.ejs",{todos:data});
}
})
});
app.post("/todo/",urlencoddedparser,function(req,res){

var data=req.body;
console.log(data);
var save=Item(req.body).save(function(err){

  if (err) throw err;
});
});
}
