import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import Nweet from "components/Nweet";

function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

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
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  const onChange = (event) => {
    const { value } = event.target;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="What's on your mind?" maxLength={120} value={nweet} onChange={onChange} />
        <input type="submit" value="Nweet" />
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
