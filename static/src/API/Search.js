import socketIOClient from 'socket.io-client';

const  socket = socketIOClient("http://localhost:3000/");

function searchResult(cb) {
  socket.on('search-result', cb);
}

function search(search) {
    socket.emit('search', search);
}

export { searchResult, search };