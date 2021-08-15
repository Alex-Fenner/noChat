import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import "./App.css"
import { css } from '@emotion/css';
import ScrollToBottom from 'react-scroll-to-bottom';

function App() {
  const [state, setState] = useState({ message: "", name: "" })
  const [chat, setChat] = useState([])

  const socketRef = useRef()
  const ROOT_CSS = css({
    height: '500px',
    width: '300px'
  });

  useEffect(
    () => {
      socketRef.current = io.connect("http://localhost:3001")
      socketRef.current.on("message", ({ name, message }) => {
        setChat([...chat, { name, message }])
      })
      return () => socketRef.current.disconnect()
    },
    [chat]
  )

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    const { name, message } = state
    socketRef.current.emit("message", { name, message })
    e.preventDefault()
    setState({ message: "", name })
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div class="card2" key={index}>
        <h6>{name}</h6>
      <div class="container">
        
        <p>{message}</p>
      </div>
    </div>

    ))
  }

  return (
    <div className="card">
      <div className="render-chat">
        <ScrollToBottom className={ROOT_CSS}>
          {renderChat()}
        </ScrollToBottom>
        <div className="footer">
          <div className="name-field">
            <TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
          </div>
          <div>
            <TextField
              name="message"
              onChange={(e) => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            />
          </div>
          <button onClick={onMessageSubmit}>Send Message</button>
        </div>
      </div>
    </div>
  )
}

export default App