//require packages
var express=require("express");
var router= express.Router();

//require models
var Doctor=require("../models/doctor");

//require middleware
var middleware=require("../middleware");

//get doctor details
router.get("/getDoctor",function(req,res) {

	//get all doctors from doctor model and send to doctor/show
	Doctor.find({},function(err,alldoctors) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("doctor/show",{doctors:alldoctors});
		}
	})
	
});

//add doctor form
router.get("/addDoctor",middleware.isLoggedIn,function(req,res) {
	res.render("doctor/new");
})


//add doctor post route
router.post("/addDoctor",middleware.isLoggedIn,function(req,res) {
	//get data from the form and add in the obj
	var dname=req.body.dname;
	var dage=req.body.age;
	var specialization=req.body.spec;
	var newDoctor={dname:dname,dage:dage,specialization:specialization};

	//add the doctors in doctor model
	Doctor.create(newDoctor,function(err,newlyAdded) {
		// body...if(err)
		if(err)
		{
			console.log(err);
		}
		else
		{	
			res.redirect("/getDoctor"); 
		}
	})
	
})


//edit doctor form
router.get("/editDoctor/:id",function(req,res) {
	//find details of doctor to be edited and print on the edit form
	Doctor.findById(req.params.id,function(err,foundDoctor) 
	{
		
				res.render("doctor/edit",{doctor:foundDoctor});
			
	});
})


//update route
router.put("/editDoctor/:id",function(req,res) {
	//find and update the new details to doctor model
	Doctor.findByIdAndUpdate(req.params.id,req.body.doctor,function(err,updatedDoctor) {
		// body...
		if(err)
		{
				console.log(err);

		}
		else
		{
			console.log(req.body.doctor);
			res.redirect("/getDoctor");
		}
	})
	
});

//delete route
router.delete("/deleteDoctor/:id",function(req,res) {
	//find the remove the specified doctor and his details
	Doctor.findByIdAndRemove(req.params.id,function(err) {
		if(err)
		{
			res.redirect("/getDoctor");
		// body...
		}
		else
		{
			res.redirect("/getDoctor");
		}
	})
});



module.exports=router;