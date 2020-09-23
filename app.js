var express = require("express");
var app= express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
//var doc=require("./models/doctor");
//var pat =require("./models/patient");
var User    =require("./models/user");



var indexRoutes=require("./routes/index");
var docRoutes =require("./routes/doctor");
var patRoutes=require("./routes/patient");
var appointRoutes=require("./routes/appointment");

app.use(express.static(__dirname + "/public"))


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/hmsprac");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");



//passport configuration
app.use(require("express-session")({
	secret:"Once again Bittu wins cutest dog!",
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





//requiring routes
app.use(indexRoutes);
app.use(docRoutes);
app.use(patRoutes);
app.use(appointRoutes);









app.listen(5000,'localhost',function() {
	// body...
	console.log("Listening to port"+5000);
	console.log(" Local Server has Started");

});