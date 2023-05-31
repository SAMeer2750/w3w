import React from 'react'
import "./LeftCom.css";
import {useState , useEffect} from 'react'
import Profile from './Profile';

function LeftCard(contract) {

    const [profileToggle, setProfileToggle] = useState(false);

    const ProfileToggle = () => {
        profileToggle ? setProfileToggle(false) : setProfileToggle(true);
    };

  return (
    <div className="leftCard">
        <div className="images">
          {/* eslint-disable-next-line */}
          <img
            className="coverImg"
            src={require("./images/Why-Are-Gas-Fees-So-High-and-How-Can-You-Avoid-Them.jpg")}
          />
          <div className="profileImg">
            {/* eslint-disable-next-line */}
            <img className="profileImage" src={require("./images/bhai.png")} />
          </div>
          <button onClick={ProfileToggle}>create profile</button>
        {profileToggle && (
        <>
            <Profile contract={contract}/>
        </>
        )}
        </div>
      </div>
  )
}

export default LeftCard