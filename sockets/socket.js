const {io} = require('../index');
const {checkJWT} = require('../helpers/jwt');
const {userConnected, userDisconnected, keepMessageInDB} = require('../controllers/socket');


// Sockets
io.on('connection', (client) => {
    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);
    
    if(!valid) {return client.disconnect();}
    
    userConnected(uid);

    // Connect user to a chatroom
    client.join(uid);

    // Listen event 'new-message'
    client.on('new-message', async (message) => {
        // keep message in DB
        await keepMessageInDB(message);
        io.to(message.to).emit('new-message', message);
    })
    
    client.on('disconnect', () => {
        userDisconnected(uid);
    });

});
