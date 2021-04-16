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