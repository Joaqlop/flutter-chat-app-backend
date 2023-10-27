const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
   const errorResult = validationResult(req);

   if (!errorResult.isEmpty()){
      return res.status(400).json({
         ok: false,
         errors: errorResult.mapped()
      });
   }
   next();
}


module.exports = {
   validate
};