const Usuario = require('../models/user');
const Message = require('../models/message');

const userConnected = async (uid = '') => {
   const user = await Usuario.findById(uid);
   user.online = true;

   console.log('Usuario conectado');

   await user.save();
   return user;
}

const userDisconnected = async (uid = '') => {
   const user = await Usuario.findById(uid);
   user.online = false;
   console.log('Usuario desconectado');
   await user.save();
   return user;
}

const keepMessageInDB = async (payload) => {
   try{
      const message = new Message(payload);
      await message.save();
      return true;
   } catch (e) {
      return false;
   }
}


module.exports = {
   userConnected,
   userDisconnected,
   keepMessageInDB
}