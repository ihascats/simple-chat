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
      limit(12),
    );
    onSnapshot(recentMessagesQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setChatMessages(data);
    });
  }, []);

  const send = (event) => {
    if (event.key !== 'Enter') return;
    sendMessage(event.target.value);
    event.target.value = '';
  };

  function doSomething() {
    const wholeChat = chatMessages.map((values) => (
      <Message key={values.id} msgData={values} />
    ));
    return wholeChat.reverse();
  }

  return (
    <div className="chat">
      <div className="chatMessages">{doSomething()}</div>
      <input onKeyDown={send} type="text" className="sendMessage"></input>
    </div>
  );
}
