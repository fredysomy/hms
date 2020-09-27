var express = require("express");
var app= express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
const sgMail = require('@sendgrid/mail');
var methodOverride=require("method-override");


var User    =require("./models/user");
var Doctor=require("./models/doctor");
var Patient=require("./models/patient");


var indexRoutes=require("./routes/index");
var docRoutes =require("./routes/doctor");
var patRoutes=require("./routes/patient");
var appointRoutes=require("./routes/appointment");
require('dotenv').config();
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/hmsprac",function(err) {
	if(err)
	{
		console.log(err);
	}
	else
	{
		console.log("we are connected")
	}
	// body...
});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");



//passport configuration
var secret=process.env.SECRET_KEY;
app.use(require("express-session")({
	secret:secret,
	resave: false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next) {
	res.locals.currentUser=req.user;
	console.log(req.user);
	next();
});


const port = process.env.PORT_NO;


//requiring routes
app.use(indexRoutes);
app.use(docRoutes);
app.use(patRoutes);
app.use(appointRoutes);









app.listen(port,'localhost',function() {
	// body...
	console.log("Listening to port "+port);
	console.log(" Local Server has Started");

});