const Usuario = require('../models/user');
const Message = require('../models/message');

const userConnected = async (uid = '') => {
   const user = await Usuario.findById(uid);
   user.online = true;
   console.log('User connected.');
   await user.save();
   return user;
}

const userDisconnected = async (uid = '') => {
   const user = await Usuario.findById(uid);
   user.online = false;
   console.log('User disconnected.');
   await user.save();
   return user;
}

const keepMessageInDB = async (payload) => {
   try{
      const message = new Message(payload);
      await message.save();
      return true;
   } catch (error) {
      return false;
   }
}


module.exports = {
   userConnected,
   userDisconnected,
   keepMessageInDB
}