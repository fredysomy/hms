var express=require("express");
var router= express.Router();
var passport=require("passport");
var User    =require("../models/user");
var middleware=require("../middleware");
//landing page
router.get("/",function(req,res) {
	// body...
	res.redirect("/login");
});

router.get("/panel",middleware.isLoggedIn,function(req,res) {
	res.render("panel",{user:req.user.username});
	
})
//show register form
router.get("/register",function(req,res) {
	res.render("register");
	// body...
});


router.post("/register",function(req,res) {
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user) {
		// body...
		if(err)
		{
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function() {
			// body...
			console.log(req.user);
			res.send("you got registered");
		});
	});
});






//login routes

//show login form
router.get("/login",function(req,res) {
	// body...
	res.render("login");
});


router.post("/login",passport.authenticate("local",
	{
		successRedirect:"/panel",
	 	failureRedirect:"/login"
	 }),function(req,res) {
	// body...

	
});



router.get("/logout",function(req,res) {
	req.logout();
	res.redirect("/login");
});






module.exports=router;