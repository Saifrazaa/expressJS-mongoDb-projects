var express = require('express');
var router = express.Router();
var flash=require("connect-flash");
var mongodb=require("mongodb");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var session=require("express-session");
var passport=require("passport");
var LocalStrategy=require("passport-local").Strategy;
var urlencoded=bodyParser.urlencoded({extended:false});
var expressValidator = require('express-validator');
router.use(expressValidator());
mongoose.connect("mongodb://saif:saif308@ds227865.mlab.com:27865/todostest");4

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
  router.use(flash());
router.use(passport.initialize());
router.use(passport.session());

//requrie user model file
var User=require("../models/users");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/signup', function(req, res, next) {
  res.render("registration",{title:"Sign Up"});
});
router.get('/login', function(req, res, next) {
res.render("login",{title:"Log In"})
});
router.post('/signup',urlencoded, function(req, res, next) {
var username=req.body.username;
var email=req.body.email;
var password=req.body.password;
var cpassword=req.body.cpassword;
req.checkBody("username","Username can not be empty").notEmpty();
req.checkBody("email","Email can not be empty").notEmpty();
req.checkBody("password","Password can not be empty").notEmpty();
req.checkBody("cpassword","Please Confirm Your password").notEmpty();
req.checkBody("email","Username can not be empty").isEmail();
req.checkBody("cpassword","Your confirm password does not match").equals(req.body.password);
var errors=req.validationErrors();
if(errors)
{
  res.render("registration",{errors:errors});
}
else {
var newuser=new User({
  username:username,
  email:email,
  password:password
});
User.createUser(newuser,function(err,user){
  if(err) throw err;
  req.flash("success","Welcome To your Dashboard "+user.username);
  res.redirect("/");
});
}
});



passport.use(new LocalStrategy(
  function(username,password,done){
    User.getUserByUsername(username,function(err,user){
      if(err) throw err;
      if(!user)
      {
        return done(null,false,{message:"unknown user"});
      }
      if(!user.validPassword(password))
      {
        return done(null,false,{message:"unknown password"});
      }
      else {
        console.log("successfully login");
     return done(null,user);
      }
    })
  }
))
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
router.post('/login',passport.authenticate('local', { successRedirect: '/',failureRedirect: '/users/login',failureFlash: true }),function(req,res){
  console.log("successfully login");
});
router.get('/logout',function(req,res,next){
  req.logout();
  req.flash("success_msg","You are successflly logout from your account");
  res.redirect("/users.login");
});







module.exports = router;
