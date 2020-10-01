var mongoose = require("mongoose");

var AppointmentSchema=mongoose.Schema({
	areason:String,
	pname:String,
	dname:String,
	ddate:{type:Date}

});


module.exports=mongoose.model("Appointment",AppointmentSchema);
