//requiring packages
var express=require("express");
var router= express.Router();

//require middleware
var middleware=require("../middleware");

//require Models
var Patient=require("../models/patient"),
     Doctor=require("../models/doctor"),
Appointment=require("../models/appointment");

//require sendgrid and dotenv
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

//get apikey from env file
const key = process.env.SENDGRID_KEY;

//get all appointments
router.get("/getAppointment",function(req,res) {
	//get all appointments from appointment model and send to appointment/show
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


//get add appointment form
router.get("/addAppointment",function(req,res) {
	//send list of doctors to appointment form frm doctor model
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


//appointment post route
router.post("/addAppointment",middleware.isLoggedIn,function(req,res) {

	//get data from the form and add in the obj
	var pname=req.body.pname;
	var areason=req.body.reason;
	var dname=req.body.dname;
	var newAppointment={pname:pname,areason:areason,dname:dname};

	//before adding the appointment check whether name provided as patient name exist in patient model
	Patient.findOne({pname:pname}, function(err,obj) {
	 console.log(obj);
	 //if patient doesnt exist redirect to add patient form
	 if(!obj)
	 {
	 	console.log("no patient");
	 	res.redirect("/addPatient");
	 } 
	 //if patient exists already
	 else
	 {
	 	//Create new appointment 
	 	Appointment.create(newAppointment,function(err,newlyAddedApp) 
			{
			// body...if(err)
				if(err)
				{
					console.log(err);
				}
				else
				{	
					
					res.redirect("/getAppointment");
					//if appointment is created use sgmail to send confirmation email
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


//delete appointment route
router.delete("/deleteAppointment/:id",function(req,res) {
	Appointment.findByIdAndRemove(req.params.id,function(err) {
		if(err)
		{
			res.redirect("/getAppointment");
		// body...
		}
		else
		{
			res.redirect("/getAppointment");

		}
	})
})


module.exports=router;
