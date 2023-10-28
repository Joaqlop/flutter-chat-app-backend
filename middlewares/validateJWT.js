const jwt = require('jsonwebtoken');

const validateJWT = (request, response, next) => {
   // Read token
   const token = request.header('x-token');

   if(!token){
      return response.status(401).json({
         ok: false,
         msg: 'The requested token doesnt exist.'
      });
   }

   try{
      const {uid} = jwt.verify(token, process.env.JWT_KEY);
      request.uid = uid;
      next();

   } catch (error) {
      return response.status(401).json({
         ok: false,
         msg: 'Invalid token.'
      });
   }
}

module.exports = {
   validateJWT
}