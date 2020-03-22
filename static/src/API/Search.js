import socketIOClient from 'socket.io-client';

const  socket = socketIOClient(`http://${window.location.hostname}:3000/`);

function searchResult(cb) {
  socket.on('search-result', cb);
}

function search(search) {
    socket.emit('search', search);
}

export { searchResult, search };