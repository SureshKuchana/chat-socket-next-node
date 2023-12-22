'use client'

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
interface ISocketContext {
  // eslint-disable-next-line no-unused-vars
  sendMessage : (msg: string) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if(!state) throw new Error(`state is undefined`)
  return state
}

export const SocketProvider = ({children} : {children: React.ReactNode}) => {
  const [socket, setSocket] = useState<Socket>();

  const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) => {
    console.log('Send message', msg);
    console.log(socket, " ---- socket");
    if(socket){
      socket.emit("event:message", { message: msg })
    }
  },[socket]);

  useEffect(() => {
    const _socket = io('http://localhost:8080');
    setSocket(_socket)
    
    return () => {
      _socket.disconnect();
      setSocket(undefined)
    }
  }, [])

  return <SocketContext.Provider value={{ sendMessage }}>
    {children}
  </SocketContext.Provider>
}