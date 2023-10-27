const Message = require('../models/message');

const getChat = async (request, response) => {
   const myUid = request.uid;
   const messagesFrom = request.params.from;

   const last100 = await Message.find({
      $or: [{from: myUid, to: messagesFrom}, {from: messagesFrom, to: myUid}]
   })
   .sort({createdAt: 'desc'})
   .limit(100);

   response.json({
      ok: true,
      messages: last100
   });
}

module.exports = {
   getChat
}