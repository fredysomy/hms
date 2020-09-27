//require packages
var express=require("express");
var router= express.Router();

//require models
var Patient=require("../models/patient");

//require middleware
var middleware=require("../middleware");


//get patient details
router.get("/getPatient",middleware.isLoggedIn,function(req,res) {
	//get all patientss from patients model and send to patients/show
	Patient.find({},function(err,allpatients) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("patient/show",{patients:allpatients});
		}
	})
	// body...
});



//add patient form
router.get("/addPatient",function(req,res) {
	res.render("patient/new");
})

//add patient post route
router.post("/addPatient",middleware.isLoggedIn,function(req,res) {
	//get data from the form and add in the obj
	var pname=req.body.pname;
	var page=req.body.page;
	var pemail=req.body.email;
	var pgender=req.body.pgender;
	var paddr=req.body.paddr;
	
	var newPatient={pname:pname,page:page,pgender:pgender,pemail:pemail,paddr:paddr};
	//add the patients in patients model
	Patient.create(newPatient,function(err,newlyAddedPat) {
		if(err)
		{
			console.log(err);
		}
		else
		{	
			res.redirect("/getPatient");
		}
	})
	
	// body...
})

//edit patient details form
router.get("/editPatient/:id",function(req,res) {
	//find details of patient to be edited and print on the edit form
	Patient.findById(req.params.id,function(err,foundPatient) 
	{
		
				res.render("patient/edit",{patient:foundPatient});
			
	});
})

//update route
router.put("/editPatient/:id",function(req,res) {
	//find and update the new details to patients model
	Patient.findByIdAndUpdate(req.params.id,req.body.patient,function(err,updatedPatient) {
		// body...
		if(err)
		{
				console.log(err);

		}
		else
		{
			console.log(req.body.patient);
			res.redirect("/getPatient");
		}
	})
	//redir
});

//delete route
router.delete("/deletePatient/:id",function(req,res) {
	Patient.findByIdAndRemove(req.params.id,function(err) {
		if(err)
		{
			res.redirect("/getPatient");
		// body...
		}
		else
		{
			res.redirect("/getPatient");
		}
	})
});

module.exports=router;