import '../component.styles/Chat.css';
import { useEffect, useState } from 'react';
import { getMessages } from '../firebase.config';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [displayMessages, setDisplayMessages] = useState();

  async function generateMessages() {
    try {
      const loadedMessages = await getMessages();
      const copy = loadedMessages;
      setMessages(copy);
      console.log(1);
    } catch (error) {
      console.log(error);
    }
  }

  function generateChat() {
    const chatMessages = messages.map((message) => (
      <div key={message.id}>
        <h6>{message.name}</h6>
        <h6>{message.timestamp}</h6>
        <p>{message.text}</p>
      </div>
    ));

    setDisplayMessages(chatMessages);
  }

  useEffect(() => {
    generateMessages();
  }, []);

  return (
    <div>
      <div className="chat">
        {displayMessages}
        <button
          onClick={() => {
            console.log(messages, 'mskmkds');
            generateChat();
          }}
        >
          CLICK ME
        </button>
        <input type="text"></input>
      </div>
    </div>
  );
}
