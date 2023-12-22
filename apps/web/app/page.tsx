'use client'
import { useState } from 'react';
import { useSocket } from '../context/SocketProvider'
import styles from './page.module.css'

export default function Page(){
  const {sendMessage} = useSocket();
  const [msg, setMsg] = useState("");
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <h1>All messages will appear here</h1>
      </div>
      <div>
        <input onChange={e => setMsg(e.target.value)} className={styles.chatInput} placeholder="Message..." type="text" />
        <button onClick={() => sendMessage(msg)} className={styles.button}>Send</button>
      </div>
    </div>
  )
}