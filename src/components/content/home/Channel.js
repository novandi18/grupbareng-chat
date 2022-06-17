import { useEffect, useState } from "react";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { onSnapshot } from "firebase/firestore";
import ChatBubble from "./ChatBubble";

const Channel = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt"), limit(15)),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMessages(data);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <div>
      <ChatBubble data={messages} />
    </div>
    // <ul>
    //   {messages.map((message) => (
    //     <li key={message.id}>{message.text}</li>
    //   ))}
    // </ul>
  );
};

export default Channel;
