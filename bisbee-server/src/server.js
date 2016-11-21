import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(7777);

  // WHEN state is updated, EMIT io event containing snapshot of state
  store.subscribe(() => io.emit('state', store.getState().toJS()));

  // WHEN client connects to server, EMIT application state to client
  io.on('connection', socket => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}
