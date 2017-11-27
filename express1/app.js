var express=require("express");
var fs=require("fs");
var bodyparser=require('body-parser');
var app=express();

var writefile=fs.writeFile("saif.html","saif raza is a software engineer ");

app.use("/assets",express.static("assets"));

var urlencodded=bodyparser.urlencoded({extended:true});
app.set('view engine' ,'ejs');
app.get("/",function(req,res){

res.render("model.ejs",{title:"Saif Raza",heading:"This is first page"});
/*console.log("your file is created successfuly");
var readfile=fs.readFileSync("saif.html");
res.send(readfile);*/

})

app.get("/contact",function(req,res){
console.log("this request is made by " +req.url);
res.render(__dirname + "/form.ejs");

})
app.get("/profile",function(req,res){

res.render(__dirname + "/saif.ejs",{data:req.query});

})
app.post("/submitt",urlencodded,function(req,res){

res.render(__dirname + "/submit.ejs",{data:req.body});

})

app.post("/contact-process",urlencodded,function(req,res){
res.render(__dirname+"/success.ejs",{data:req.body});

})
app.listen(3000,"localhost");
