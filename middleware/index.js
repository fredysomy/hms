var middlewareObj={}

//check whether is there anyone logged in?
middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

module.exports=middlewareObj;