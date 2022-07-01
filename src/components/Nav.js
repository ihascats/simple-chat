import '../component.styles/Nav.css';
import { useState } from 'react';
import { signInWithGoogle, user } from '../firebase.config';
import pencil from '../images/pencil.png';

export default function Nav() {
  const [displayInfo, setDisplayInfo] = useState();

  const processInformation = async (userInfo) => {
    const info = await userInfo;
    const name = info.user.displayName;
    const email = info.user.email;
    const userPicture = info.user.photoURL;
    user.setName(name);
    user.setEmail(email);
    user.setPicture(userPicture);

    changeInfo();
  };

  const changeInfo = () => {
    setDisplayInfo(
      <div className="user">
        <p onClick={changeName}>
          {user.name}
          <img src={pencil} alt="edit" />
        </p>
        <img src={user.picture} alt="user image" />
      </div>,
    );
  };

  const changeName = () => {
    setDisplayInfo(
      <div className="user">
        <input
          type="text"
          onKeyDown={setNewName}
          className="changeName"
        ></input>
        <img src={user.picture} alt="user image" />
      </div>,
    );
  };

  const setNewName = (event) => {
    if (event.key !== 'Enter') return;
    user.setName(event.target.value);
    changeInfo();
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
