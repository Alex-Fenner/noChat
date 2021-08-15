import React,{useEffect} from 'react'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";

const Ticker = () => {
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
      }, []);
    
    return (
        <>
            <p>Test element </p>
        </>
    )
}

export default Ticker
