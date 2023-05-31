import React, { useState } from 'react'
import axios from "axios";

function Profile(contract) {

    const [profileImg, setProfileImg] = useState(null);
    const [userName, setUserName] = useState(null);
    const [bio, setBio] = useState(null);
    const [profilePicCID, setProfilePicCID] = useState(null);
    const [uploading, setUploading] = useState(false);

    const CreateProfile = async ()=>{
        const ProfileTx = await contract.createProfile(userName, bio, profilePicCID);
        await ProfileTx.wait();
        console.log("created")
    }

    const handleImgChange = (e)=>{
        setProfileImg(e.target.files[0])
    }

    const handleUpload = async () => {
        try {
        const formData = new FormData();
        formData.append("file", profileImg);

        setUploading(true);

        const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: "3d07323041296c2f041f",
            pinata_secret_api_key:
                "c1300780df980e21c76e78c30593b3c23736357a85ebbc2481da0105d73b5315",
            },
        }
        );

        console.log("IPFS CID:", response.data.IpfsHash);
        setProfilePicCID(response.data.IpfsHash);
    } catch (error) {
        console.error("Error uploading to IPFS:", error);
    } finally {
        setUploading(false);
    }
    };


    return (
        <>
        <h1>hello..</h1>
        <div className='Profile'>
            <div className='inputs'>
                <input 
            placeholder="User Name..." 
            type="text"
            onChange={(e) => {
            setUserName(e.target.value);
            }}
        />
            </div>
            <hr />
        <div className='inputs'>
                <input 
            placeholder="Bio..." 
            type="text"
            onChange={(event) => {
            setBio(event.target.value);
            }}/>
            </div>
            <hr />
            <div className="fileUpload">
        <p className="uploadImage">Upload an image</p>
        <input type="file" onChange={handleImgChange} />
        <button
            className="inputs button"
            onClick={()=>{handleUpload()}}
            disabled={!profileImg || uploading}
        >
            upload
        </button>
        {uploading && <div>Loading...</div>}
        <hr />
        <button onClick={CreateProfile}>create profile</button>
        </div>
        </div>
        </>
    )
}

export default Profile