var mongoose = require("mongoose");

var DoctorSchema=mongoose.Schema({
	dname:String,
	dage:Number,
	specialization:String
});


module.exports=mongoose.model("Doctor",DoctorSchema);