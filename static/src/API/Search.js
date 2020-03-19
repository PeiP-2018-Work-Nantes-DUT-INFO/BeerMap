import socketIOClient from 'socket.io-client';

const  socket = socketIOClient("http://77.201.204.64:3000/");

function searchResult(cb) {
  socket.on('search-result', cb);
}

function search(search) {
    socket.emit('search', search);
}

export { searchResult, search };