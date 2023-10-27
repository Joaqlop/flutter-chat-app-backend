const { response } = require("express");
const Usuario = require('../models/user');


const getUsers = async (req, res = response) => {

   const from = Number(req.query.desde) || 0;

   const userList = await Usuario
      .find({_id: {$ne: req.uid}})
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