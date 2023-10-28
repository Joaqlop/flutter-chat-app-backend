const { response } = require("express");
const Usuario = require('../models/user');


const getUsers = async (request, res = response) => {

   const from = Number(request.query.desde) || 0;

   const userList = await Usuario
      .find({_id: {$ne: request.uid}})
      .sort('-online')
      .skip(from)
      .limit(20);

   res.json({
      ok: true,
      userList
   })
}

module.exports = {
   getUsers
}