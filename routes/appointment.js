var express=require("express");
var router= express.Router();
var middleware=require("../middleware");

router.get("/getappointment",middleware.isLoggedIn,function(req,res) {
	res.send("this is appointment route");
	// body...
});


router.get("/addAppointment",function(req,res) {
	res.send("this will  be appointment form");
})

router.get("/editAppointment/:id",function(req,res) {
	res.send("this will be editAppointment form");
})

router.get("/deleteAppointment/:id",function(req,res) {
	res.send("deleteAppointment form");
})
module.exports=router;