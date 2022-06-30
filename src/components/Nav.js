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
      <div className="user">
        <p>{name}</p>
        <img src={userPicture} alt="user image" />
      </div>,
    );
  };

  return (
    <nav>
      {displayInfo ? (
        displayInfo
      ) : (
        <button
          onClick={() => {
            processInformation(signInWithGoogle());
          }}
          className="signIn"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
            alt="google logo"
          />
          Sign In
        </button>
      )}
    </nav>
  );
}
