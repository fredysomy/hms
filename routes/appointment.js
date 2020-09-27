var express=require("express");
var router= express.Router();
var middleware=require("../middleware");
var Patient=require("../models/patient");
var Doctor=require("../models/doctor");
var Appointment=require("../models/appointment");
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const key = process.env.SENDGRID_KEY;
router.get("/getappointment",function(req,res) {
	Appointment.find({},function(err,allappointments) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(key);
			res.render("appointment/show",{appointments:allappointments});
		}
		// body...
	})

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
					res.redirect("/getappointment");
					sgMail.setApiKey(key);


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



router.delete("/deleteAppointment/:id",function(req,res) {
	Appointment.findByIdAndRemove(req.params.id,function(err) {
		if(err)
		{
			res.redirect("/getappointment");
		// body...
		}
		else
		{
			res.redirect("/getappointment");

		}
	})
})


module.exports=router;
