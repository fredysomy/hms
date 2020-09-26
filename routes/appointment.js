var express=require("express");
var router= express.Router();
var middleware=require("../middleware");
var Patient=require("../models/patient");
var Doctor=require("../models/doctor");
var Appointment=require("../models/appointment");
const sgMail = require('@sendgrid/mail');
router.get("/getappointment",middleware.isLoggedIn,function(req,res) {
	res.render("appointment/show");
	// body...
});





router.get("/addAppointment",function(req,res) {
	Doctor.find({},function(err,alldoctors) {
		if(err)
		{
			console.log(err);
		}
		else
		{	
			res.render("appointment/new",{doctor:alldoctors});
		}
		// body...
	})
	
});

router.post("/addAppointment",middleware.isLoggedIn,function(req,res) {
	var pname=req.body.pname;
	var areason=req.body.reason;
	var dname=req.body.dname;
	var newAppointment={pname:pname,areason:areason,dname:dname};
	Patient.findOne({pname:pname}, function(err,obj) {
	 console.log(obj);
	 if(!obj)
	 {
	 	console.log("no patient");
	 	res.redirect("/addPatient");
	 } 
	 else
	 {
	 	Appointment.create(newAppointment,function(err,newlyAddedApp) 
			{
			// body...if(err)
				if(err)
				{
					console.log(err);
				}
				else
				{	
					//sendgrid
					res.render("appointment/show");
					sgMail.setApiKey("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");
					const msg = {
  									to: obj.pemail,
  									from: 'hmsofficial1011@gmail.com',
  									subject: 'Comfirmation mail',
  									text: 'your appointment with Doctor '+dname+' is confirmed for '+areason,
								};
					sgMail.send(msg, (error, result) => {
    					if (error)
    					{
      						console.log(error);
    					}
    					else
    					{
     				 		console.log("sent");
    					}
  					});
				}
			})
	 }

	});
	 
})

router.get("/editAppointment/:id",function(req,res) {
	res.send("this will be editAppointment form");
})

router.get("/deleteAppointment/:id",function(req,res) {
	res.send("deleteAppointment form");
})
module.exports=router;