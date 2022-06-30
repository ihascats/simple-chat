import '../component.styles/Nav.css';
import { useState } from 'react';
import { signInWithGoogle } from '../firebase.config';

export default function Nav() {
  const [user, setUser] = useState();
  const [displayInfo, setDisplayInfo] = useState();

  const processInformation = async (userInfo) => {
    const info = await userInfo;
    const name = info.user.displayName;
    const email = info.user.email;
    const userPicture = info.user.photoURL;
    setUser({
      name,
      email,
      userPicture,
    });

    setDisplayInfo(
      <div>
        <p>{name}</p>
        <img src={userPicture} alt="user image" />
      </div>,
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          processInformation(signInWithGoogle());
        }}
      >
        SIGN IN WITH GOOGLE
      </button>
      {displayInfo}
    </div>
  );
}
