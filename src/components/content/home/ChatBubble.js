import { ChevronDownIcon } from "@heroicons/react/solid";
import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../services/firebase";
import { Spinner } from "flowbite-react";
import { useDispatch } from "react-redux";
import { replies } from "../../../features/chat/replySlice";
import { timestampTime } from "../../../features/func/timestampConvert";

const ChatBubble = ({ data, user, member, members }) => {
  const [more, setMore] = useState(false);
  const [popup, setPopup] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [readmore, setReadmore] = useState(false);
  const dispatch = useDispatch();

  const replyChat = (id, chat, name) => {
    dispatch(replies({ id, chat, name }));
    setPopup(false);
  };

  const deleteChat = async (id) => {
    setDeleted(true);
    await deleteDoc(doc(db, "messages", id)).then(() => setDeleted(false));
  };

  useEffect(() => {
    setReadmore(data.text.split("\n").length >= 10 ? true : false);
  }, []);

  return (
    <div
      className={"mb-3 flex " + (data.uid === user.uid ? "justify-end" : "")}
    >
      <div
        className={
          "py-3 px-4 max-w-sm md:max-w-lg rounded-lg border flex flex-col text-sm whitespace-pre-line " +
          (data.uid === user.uid
            ? "bg-blue-700 border-blue-600 text-slate-100"
            : "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700")
        }
        onMouseEnter={() => setMore(true)}
        onMouseLeave={() => (popup ? setMore(true) : setMore(false))}
      >
        <div className="flex justify-between items-center h-5 duration-100 ease-in-out mb-1">
          <span className="font-bold mr-5">
            {user.uid === member[0].uid ? "You" : member[0].name}
          </span>
          <div className="relative">
            <button
              onClick={() => setPopup(!popup)}
              type="button"
              className={
                "duration-75 ease-in flex items-center " +
                (more ? "" : "hidden")
              }
            >
              <ChevronDownIcon
                className={
                  "w-6 h-6 " +
                  (data.uid === user.uid
                    ? "text-blue-400"
                    : "text-slate-400 dark:text-slate-600")
                }
              />
            </button>
            <div
              className={
                (data.uid === user.uid ? "right-0" : "") +
                " border bg-slate-200 dark:bg-slate-800 dark:border-slate-700 border-slate-300 absolute rounded-lg flex-col duration-75 ease-in " +
                (popup && more ? "flex " : "hidden ") +
                (deleted ? "w-36" : "w-32")
              }
            >
              <button
                onClick={() => replyChat(data.id, data.text, member[0].name)}
                type="button"
                className={
                  "px-4 py-3 text-left hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 " +
                  (data.uid === user.uid ? "rounded-t-lg" : "rounded-lg")
                }
              >
                Reply
              </button>
              {data.uid === user.uid ? (
                <button
                  onClick={() => deleteChat(data.id)}
                  type="button"
                  className="px-4 py-3 text-left text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-b-lg"
                >
                  <span className="mr-2">Delete Chat</span>
                  <Spinner
                    size="sm"
                    light={true}
                    hidden={deleted ? false : true}
                  />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div
          className={
            data.reply.length > 0
              ? data.uid === user.uid
                ? "flex flex-col px-3 py-2 rounded-md -mx-3 mb-2 bg-blue-900"
                : "flex flex-col px-3 py-2 rounded-md -mx-3 mb-2 bg-slate-300 dark:bg-slate-700"
              : "hidden"
          }
        >
          <span className="text-xs font-semibold mb-1">
            {data.reply.length > 0 && data.reply !== "G"
              ? members.filter((m) => m.uid === data.reply[0].uid)[0].uid ===
                user.uid
                ? "You"
                : members.filter((m) => m.uid === data.reply[0].uid)[0].name
              : "Unknown"}
          </span>
          <span
            className={
              "text-xs " +
              (data.reply.length > 0 && data.reply !== "G" ? "" : "italic")
            }
          >
            {data.reply.length > 0 && data.reply !== "G"
              ? data.reply[0].text
              : "This chat has been deleted."}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className={readmore ? "line-clamp-10" : ""}>{data.text}</span>
            <span
              onClick={() => setReadmore(false)}
              className={
                "text-yellow-300 cursor-pointer mb-5 " +
                (readmore ? "" : "hidden")
              }
            >
              Read more
            </span>
          </div>
          <span
            className={
              "text-xs mt-auto pl-5 select-none " +
              (data.uid === user.uid ? "text-blue-400" : "text-slate-500")
            }
          >
            {timestampTime(data.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
