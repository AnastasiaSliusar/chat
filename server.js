let net = require('net');

let server = net.createServer();


let sockets = [];
var port = 4001;

server.on('listening',()=>{});

server.on('connection',(socket)=>{
    console.log('Got a new connection');

    sockets.push(socket);
    socket.on('data', (data)=>{
        console.dir(data);

        sockets.map((otherSocket)=>{
            if (otherSocket !== socket) {
                otherSocket.write(data);
            }
        })
    })
});

server.on('close',()=>{
    console.log(`Server is closed now`);
    let socketIndex = sockets.indexOf(socket);
    sockets.splice(socketIndex, 1);
});

server.on('error',(error)=>{
    console.log(`Error:${error.message}`);
});

server.listen(port);