var express=require("express");
var router= express.Router();
var middleware=require("../middleware");

router.get("/getpatient",middleware.isLoggedIn,function(req,res) {
	res.send("this is patient route");
	// body...
});
router.get("/addPatient",function(req,res) {
	res.send("this will  be add Patient form");
})

router.get("/editPatient/:id",function(req,res) {
	res.send("this will be editPatient form");
})

router.get("/deletePatient/:id",function(req,res) {
	res.send("deletePatient form");
})
module.exports=router;