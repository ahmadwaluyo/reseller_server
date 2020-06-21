function handleError(err, req, res, next){
    console.log('ini error', err);
   if(err.name == "SequelizeValidationError"){
       const errors = err.errors.map(el => ({
           message : el.message
       }))
       return res.status(400).json({
           code:"400",
           type:"BadRequest",
           error: errors
       })
   } else if(err.name == "BadRequest"){
       return res.status(400).json({
           errors: err.errors
       })
   } else if(err.name == "InternalServerError"){
       return res.status(500).json({
           errors: err.errors
       })
   } else if(err.name == "User Not Found"){
       return res.status(404).json({
           errors: err.errors
       })
   }else if(err.name == "JsonWebTokenError"){
       return res.status(401).json({
           errors: err.errors,
           message: "Please sign in first"
       })
   }else if(err.name == "Unauthorized"){
       return res.status(401).json({
           errors: err.errors
       })
   } else {
       return res.status(500).json({
           errors: err.errors
       })
   }
}


module.exports = handleError;