const channels = (server) => {
    // llamada al socket
    const io = require('socket.io')(server);
    
    // canal por defecto = connect
    io.on('connect', socket => {
        console.log(`Cliente conectado ${socket.client.id}`);
        
        // nuevo canal  - canal de prueba
        socket.on('saludo', (data) => {
            console.log(`El cliente dijo: 
            ${JSON.stringify(data)}`);
            // Respuesta
            io.emit('saludo:respuesta', data);
        })

        // canal post
        socket.on('post', data => {
            console.log(`Client post: ${JSON.stringify(data)}`);
            io.emit('post:respuesta', data);
        });


        // crear el evento de la sala (join to room)
        socket.on('unir:sala', room => {
            socket.join(room);
            console.log(`El cliente: ${socket.client.id} se ha unido a la sala ${room}`)
        })
        
        socket.on('mensaje:room', ({message, room}) => {
            console.log(`En la sala ${room} se ha dicho/enviado: ${JSON.stringify(message)} `);
             //enviar respuesta a socket conectados
             io.to(room).emit('mensaje:room:respuesta', message);
        });

       


        // socket disconnect
        socket.on('disconnect', ()=>{
            console.log(`Cliente desconectado ${socket.client.id}`);
        });
    });
    
}

module.exports = channels;