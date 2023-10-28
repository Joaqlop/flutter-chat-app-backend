const { validationResult } = require('express-validator');

const validate = (request, response, next) => {
   const errorResult = validationResult(request);

   if (!errorResult.isEmpty()){
      return response.status(400).json({
         ok: false,
         errors: errorResult.mapped()
      });
   }
   next();
}


module.exports = {
   validate
};