import '../component.styles/Chat.css';
import { useEffect, useState } from 'react';
import { database, sendMessage } from '../firebase.config';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
} from 'firebase/firestore';
import Message from './Message';

export default function Chat() {
  const messagesCollection = collection(database, 'messages');
  const [chatMessages, setChatMessages] = useState([
    { name: '...Loading', id: 0 },
  ]);

  useEffect(() => {
    const recentMessagesQuery = query(
      messagesCollection,
      orderBy('timestamp', 'desc'),
      limit(24),
    );
    onSnapshot(recentMessagesQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setChatMessages(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateChatMessages() {
    const wholeChat = chatMessages.map((values, index) => {
      if (index === 0) {
        return (
          <Message
            style={{ marginBottom: 24 + 'px' }}
            key={values.id}
            msgData={values}
          />
        );
      }
      return (
        <Message
          style={{ marginBottom: 0 + 'px' }}
          key={values.id}
          msgData={values}
        />
      );
    });
    return wholeChat;
  }

  const send = (event) => {
    if (event.key !== 'Enter') return;
    if (event.shiftKey) return;
    if (event.target.value !== '') {
      sendMessage(event.target.value);
      event.target.value = '';
    }
  };

  const resize = (event) => {
    event.target.style.height = '5px';
    event.target.style.height = event.target.scrollHeight + 'px';
  };

  return (
    <div className="chat">
      <div className="chatMessages">{generateChatMessages()}</div>
      <textarea
        onKeyDown={send}
        onInput={resize}
        type="text"
        className="sendMessage"
      ></textarea>
    </div>
  );
}
