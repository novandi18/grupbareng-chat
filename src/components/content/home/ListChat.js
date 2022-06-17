import ChatBubble from "./ChatBubble";
import Welcome from "./Welcome";
import { useEffect, useState } from "react";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { onSnapshot } from "firebase/firestore";
import Loading from "../../../Loading";
import ChatSkeleton from "./ChatSkeleton";
import { messageDate } from "../../../features/func/timestampConvert";

const ListChat = ({ user, member }) => {
  const [messages, setMessages] = useState([]);
  const [skeleton, setSkeleton] = useState(false);

  useEffect(() => {
    setSkeleton(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt", "desc")),
      (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        data = data.map((d) => {
          d.reply =
            d.reply.length > 0
              ? data.filter((y) => y.id === d.reply).length > 0
                ? data.filter((y) => y.id === d.reply)
                : "G"
              : [];
          return d;
        });

        setSkeleton(false);
        setMessages(data);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <>
      {(user !== undefined && member !== undefined) ||
      (user !== null && member !== null) ? (
        skeleton ? (
          <ChatSkeleton />
        ) : (
          <div className="px-3 flex flex-col-reverse overflow-auto w-full h-full pt-5">
            {messages.map((m, i) => (
              <>
                <ChatBubble
                  key={m.id}
                  data={m}
                  user={user}
                  member={member.filter((me) => me.uid === m.uid)}
                  members={member}
                />

                {m.createdAt !== null ? (
                  <div
                    className={
                      (i === messages.length - 1
                        ? messageDate(messages[i].createdAt.seconds) ===
                          messageDate(messages[i - 1].createdAt.seconds)
                          ? "hidden"
                          : "flex"
                        : messageDate(messages[i].createdAt.seconds) ===
                          messageDate(messages[i + 1].createdAt.seconds)
                        ? "hidden"
                        : "flex") + " justify-center mb-5 items-center"
                    }
                  >
                    <div className="bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 border rounded-lg px-5 py-1 text-sm">
                      {messageDate(m.createdAt.seconds)}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            ))}
            {messages.length > 5 ? "" : <Welcome />}
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ListChat;
