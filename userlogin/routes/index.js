var express = require('express');
var router = express.Router();
var session=require("express-session");
var flash=require("connect-flash");
var message=require("express-messages");
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
  router.use(flash());

/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' ,msg:req.flash('success')});
});
function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated())
  {
    return next();
  }
  else
{
   console.log("not ");
  res.redirect("/users/login");
}
}
module.exports = router;
