import '../component.styles/Message.css';

export default function Message({ msgData }) {
  let time = new Date().toLocaleString();
  if (msgData.timestamp) {
    time = new Date(msgData.timestamp.seconds * 1000).toLocaleString();
  }

  const textElement = () => {
    const text = msgData.text.split(' ');
    console.log(text);

    const element = (
      <p>
        {text.map((word) => {
          if (word.slice(0, 8) === 'https://') {
            return <a href={word}>{`${word} `}</a>;
          } else {
            return `${word} `;
          }
        })}
      </p>
    );
    return element;
  };

  // if (word.slice(0, 8) === 'https://') {
  //   return <a href={word}>{word}</a>;
  // }

  let child;
  if (msgData.text) {
    child = textElement();
  }
  return (
    <div className="message">
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
