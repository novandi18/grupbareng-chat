import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Loading from "../../../Loading";
import { db } from "../../../services/firebase";
import ChatInput from "./ChatInput";
import ListChat from "./ListChat";

const Home = ({ user, verify }) => {
  const [members, setMembers] = useState([]);
  const ref = query(collection(db, "members"));

  useEffect(() => {
    document.title = "Chats";

    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMembers(data);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {verify ? (
        <div className="lg:px-14 pt-16 pb-5 h-screen flex flex-col justify-between">
          <ListChat user={user} member={members} />
          <div className="w-full mt-2">
            <ChatInput
              user={user}
              member={members.filter((member) => member.uid === user.uid)}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
