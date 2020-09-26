var mongoose = require("mongoose");

var PatientSchema=mongoose.Schema({
	pname:String,
	page:Number,
	pemail:String,
	pgender:String,
	paddr:String
});


module.exports=mongoose.model("Patient",PatientSchema);