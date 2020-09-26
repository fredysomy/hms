var express=require("express");
var router= express.Router();
var Doctor=require("../models/doctor");
var middleware=require("../middleware");


router.get("/getdoctor",function(req,res) {
	Doctor.find({},function(err,alldoctors) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("doctor/show",{doctors:alldoctors});
		}
		// body...
	})
	

	/*const filter = {};*/
	
	/*const all = Doctor.find(filter);
	console.log(all);*/
	// body...
});
router.get("/addDoctor",middleware.isLoggedIn,function(req,res) {
	res.render("doctor/new");
})

router.post("/addDoctor",middleware.isLoggedIn,function(req,res) {
	var dname=req.body.dname;
	var dage=req.body.age;
	var specialization=req.body.spec;
	var newDoctor={dname:dname,dage:dage,specialization:specialization};

	Doctor.create(newDoctor,function(err,newlyAdded) {
		// body...if(err)
		if(err)
		{
			console.log(err);
		}
		else
		{	
			res.redirect("/getdoctor"); 
		}
	})
	
	// body...
})

router.get("/editDoctor/:id",function(req,res) {
	Doctor.findById(req.params.id,function(err,foundDoctor) 
	{
		
				res.render("doctor/edit",{doctor:foundDoctor});
			
	});
})

router.put("/editDoctor/:id",function(req,res) {
	//find and update

	Doctor.findByIdAndUpdate(req.params.id,req.body.doctor,function(err,updatedDoctor) {
		// body...
		if(err)
		{
				console.log(err);

		}
		else
		{
			console.log(req.body.doctor);
			res.redirect("/getdoctor");
		}
	})
	//redir
});

router.delete("/deleteDoctor/:id",function(req,res) {
	Doctor.findByIdAndRemove(req.params.id,function(err) {
		if(err)
		{
			res.redirect("/getdoctor");
		// body...
		}
		else
		{
			res.redirect("/getdoctor");
		}
	})
});



module.exports=router;