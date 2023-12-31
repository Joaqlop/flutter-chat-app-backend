const mongoose = require('mongoose');

const dbConnection = async () => {
   try{
      await mongoose.connect(process.env.DB_CNN);
      console.log('MongoDB Online');
   } catch (error) {
      console.log(error);
      throw new Error('Error de conexión a la base de datos.');
   }
}

module.exports = {
   dbConnection
}