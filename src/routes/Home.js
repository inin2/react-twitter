import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import Nweet from "components/Nweet";

function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
    const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") { 
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(attachmentRef);
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, "nweets"), nweetObj);
    setNweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const { value } = event.target;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const { files } = event.target;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const fileInput = useRef();
  const onClearAttachmentClick = () => {
    setAttachment("");
    fileInput.current.value = "";
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="What's on your mind?" maxLength={120} value={nweet} onChange={onChange} />
        <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} alt={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
}

export default Home;
