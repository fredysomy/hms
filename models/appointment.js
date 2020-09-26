var mongoose = require("mongoose");

var AppointmentSchema=mongoose.Schema({
	areason:String,
	pname:String,
	dname:String
});


module.exports=mongoose.model("Appointment",AppointmentSchema);
