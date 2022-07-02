import '../component.styles/Message.css';

export default function Message({ msgData, style }) {
  let time = new Date().toLocaleString();
  if (msgData.timestamp) {
    time = new Date(msgData.timestamp.seconds * 1000).toLocaleString();
  }

  const textElement = () => {
    const text = msgData.text.split(' ');

    const element = (
      <p>
        {text.map((word) => {
          if (word.slice(0, 8) === 'https://') {
            return <a key="link" href={word}>{`${word} `}</a>;
          } else if (word.includes('_nl_')) {
            const replaced = word.replace('_nl_', '');
            return `${replaced}\n`;
          } else {
            return `${word} `;
          }
        })}
      </p>
    );
    return element;
  };

  let child;
  if (msgData.text) {
    child = textElement();
  }
  return (
    <div style={style || null} className="message">
      <img src={msgData.profilePicUrl} alt={`${msgData.name}'s pfp`} />
      <div className="messageText">
        <div className="messageUserInfo">
          <h4>{msgData.name}</h4>
          <h6>{time}</h6>
        </div>
        {child}
      </div>
    </div>
  );
}
