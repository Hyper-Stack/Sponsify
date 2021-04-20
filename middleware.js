module.exports.isMLoggedIn = function(req,res,next){
    console.log(req.user)
    if(!req.isAuthenticated()){
        req.session.returnto = req.originalUrl;
        req.flash('error', 'You must be signed in first')
        return res.redirect('/manager/register')
    }
    next();
}
module.exports.isSLoggedIn = function(req,res,next){
    console.log(req.user)
    if(!req.isAuthenticated()){
        req.session.returnto = req.originalUrl;
        req.flash('error', 'You must be signed in')
        return res.redirect('/sponsors/register')
    }
    
    next();
}
module.exports.requireMlogin = function(req,res,next){
    if(!req.session.user_id){
        return res.redirect('/manager/register')
    }
    next();
}
module.exports.requireSlogin = function(req,res,next){
    if(!req.session.user_id){
        return res.redirect('/sponsors/register')
    }
    next();
}