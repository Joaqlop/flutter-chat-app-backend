const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
   
   return new Promise((resolve, reject) => {
      const payload = {uid};

      jwt.sign(payload, process.env.JWT_KEY, {
         expiresIn: '24h'
      }, (error, token) => {
         if (error) {
            // Token didnt create
            reject('jsonwebtoken didnt generate');
         } else {
            // Token generate
            resolve(token);
         }
      });
   });

};

module.exports = {
   generateJWT
};