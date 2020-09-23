var express=require("express");
var router= express.Router();
var middleware=require("../middleware");


router.get("/getdoctor",middleware.isLoggedIn,function(req,res) {
	res.send("this is doctor route");
	// body...
});
router.get("/addDoctor",function(req,res) {
	res.send("this will  be add doctor form");
})

router.get("/editDoctor/:id",function(req,res) {
	res.send("this will be editDoctor form");
})

router.get("/deleteDoctor/:id",function(req,res) {
	res.send("deleteDoctor form");
})
module.exports=router;