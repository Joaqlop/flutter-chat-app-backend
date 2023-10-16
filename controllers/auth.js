const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/user');
const {generateJWT} = require('../helpers/jwt');

const createUser = async (request, res = response) => {

   const {email, password} = request.body;

   try {
      const emailExists = await Usuario.findOne({email});
      if (emailExists){
         return res.status(400).json({
            ok: false,
            msg: 'El correo ya se encuentra registrado.'
         });
      }

      // User creation
      const user = new Usuario(request.body);

      // Password encryption
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      // Save in Database
      await user.save();

      // JSON WEB TOKEN
      const token = await generateJWT(user.id);

      res.json({
         ok: true,
         user,
         token
      });

   } catch(error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Problemas de server.'
      });
   }
};

const login = async (request, res = response) => {
   
   const {email, password} = request.body;

   try{
      
      // email validation
      const userInDB = await Usuario.findOne({email});
      if (!userInDB){
         return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado.'
         });
      }

      // password validation
      const validPassword = bcrypt.compareSync(password, userInDB.password);
      if (!validPassword){
         return res.status(400).json({
            ok: false,
            msg: 'Contraseña incorrecta. Intenta nuevamente.'
         });
      }

      // JSON WEB TOKEN
      const token = await generateJWT(userInDB.id);

      res.json({
         ok: true,
         userInDB,
         token
      });

   } catch(error){
      console.log(error);
      return res.status(500).json({
         ok: false,
         msg: 'Error 500'
      });
   }  
};

const renewToken = async (request, res = response) => {

   const uid = request.uid;

   // Generate new JSON WEB TOKEN
   const token = await generateJWT(uid);

   // Find user in DB
   const user = await Usuario.findById(uid); 

   res.json({
      ok: true,
      user,
      token
   });
};

module.exports = {
   createUser,
   login,
   renewToken
}