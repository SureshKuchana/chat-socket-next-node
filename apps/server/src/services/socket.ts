import { Server } from "socket.io";

class SocketService{
  private _io: Server
  constructor(){
    console.log('Init socker server..');
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*"
      }
    });
  }

  public initListeners(){
    const io = this.io;
    console.log('Initialize socket Listners.. ');
    io.on('connect', (socket) => {
      console.log(`New socket connected `, socket.id);

      socket.on('event:message', async ({ message } : { message: string }) => {
        console.log(`New message Rec. ${message}`);
      })
    })
  }

  get io() { return this._io }
}

export default SocketService