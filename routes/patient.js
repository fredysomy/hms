var express=require("express");
var router= express.Router();
var Patient=require("../models/patient");
var middleware=require("../middleware");

router.get("/getpatient",middleware.isLoggedIn,function(req,res) {
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


router.get("/addPatient",function(req,res) {
	res.render("patient/new");
})

router.post("/addPatient",middleware.isLoggedIn,function(req,res) {
	var pname=req.body.pname;
	var page=req.body.page;
	var pemail=req.body.email;
	var pgender=req.body.pgender;
	var paddr=req.body.paddr;
	
	var newPatient={pname:pname,page:page,pgender:pgender,pemail:pemail,paddr:paddr};

	Patient.create(newPatient,function(err,newlyAddedPat) {
		// body...if(err)
		if(err)
		{
			console.log(err);
		}
		else
		{	
			res.redirect("/getpatient");
		}
	})
	
	// body...
})

router.get("/editPatient/:id",function(req,res) {
	Patient.findById(req.params.id,function(err,foundPatient) 
	{
		
				res.render("patient/edit",{patient:foundPatient});
			
	});
})


router.put("/editPatient/:id",function(req,res) {
	//find and update

	Patient.findByIdAndUpdate(req.params.id,req.body.patient,function(err,updatedPatient) {
		// body...
		if(err)
		{
				console.log(err);

		}
		else
		{
			console.log(req.body.patient);
			res.redirect("/getpatient");
		}
	})
	//redir
});

router.delete("/deletePatient/:id",function(req,res) {
	Patient.findByIdAndRemove(req.params.id,function(err) {
		if(err)
		{
			res.redirect("/getpatient");
		// body...
		}
		else
		{
			res.redirect("/getpatient");
		}
	})
});

module.exports=router;