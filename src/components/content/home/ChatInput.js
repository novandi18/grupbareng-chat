import { useState } from "react";
import { EmojiHappyIcon, XIcon } from "@heroicons/react/solid";
import data from "@emoji-mart/data";
import { Picker } from "emoji-mart";
import { useEffect, useRef } from "react";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { Spinner } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { clearReplies } from "../../../features/chat/replySlice";

function EmojiPicker(props) {
  const ref = useRef();

  useEffect(() => {
    new Picker({ ...props, data, ref });
  }, []);

  return <div ref={ref} />;
}

const ChatInput = ({ user, member }) => {
  const [send, setSend] = useState(false);
  const ref = collection(db, "messages");
  const [rows, setRows] = useState(1);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [val, setVal] = useState("");
  const { reply } = useSelector((state) => state.reply);
  const dispatch = useDispatch();

  const cancelReply = () => {
    dispatch(clearReplies([]));
  };

  const resizeInput = (e) => {
    let text = e.target.value.split("\n").length;
    setRows(text);
    setVal(e.target.value);
  };

  const insertEmoji = (e) => {
    document.getElementById("chatinp").value =
      document.getElementById("chatinp").value + e.native;
  };

  const submitNewMessage = async () => {
    setSend(true);
    await addDoc(ref, {
      text: document.getElementById("chatinp").value,
      createdAt: serverTimestamp(),
      uid: user.uid,
      reply: reply.length > 0 ? reply[0].id : "",
    }).then(() => {
      cancelReply();
      setRows(1);
      document.getElementById("chatinp").value = "";
      setVal("");
      setSend(false);
    });
  };

  return (
    <div className="lg:px-0 px-5">
      <div
        className={
          "absolute bottom-0 duration-75 ease-in z-10 h-96 rounded-lg overflow-hidden " +
          (openEmoji ? "" : "hidden ") +
          (rows >= 3
            ? reply.length > 0
              ? "mb-56"
              : "mb-48"
            : reply.length > 0
            ? "mb-32"
            : "mb-20")
        }
      >
        <EmojiPicker onEmojiSelect={insertEmoji} />
      </div>
      <div>
        {reply.length > 0 ? (
          <div className="w-full h-10 rounded-t-lg bg-slate-200 duration-100 ease-in border-slate-300 border border-b-0 dark:bg-slate-800 dark:border-slate-700 flex justify-between items-center">
            <div className="text-sm truncate pl-4">
              <strong className="mr-3 text-blue-700 dark:text-blue-600">
                {reply[0].name === member[0].name ? "You" : reply[0].name}
              </strong>
              <span className="dark:text-slate-300 text-slate-700">
                {reply[0].chat}
              </span>
            </div>
            <div className="flex justify-center px-2">
              <button
                onClick={() => cancelReply()}
                type="button"
                className="p-1 rounded-full hover:bg-slate-900 hover:bg-opacity-10 dark:hover:bg-opacity-50"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="relative z-20">
          <div className="absolute h-full flex items-center px-3">
            <button
              onClick={() => setOpenEmoji(!openEmoji)}
              type="button"
              className="outline-none hover:bg-opacity-10 z-10 hover:bg-slate-900 p-1.5 rounded-full duration-75 ease-in active:bg-opacity-20"
            >
              <EmojiHappyIcon
                className={
                  "w-6 h-6 " +
                  (openEmoji
                    ? "text-blue-700 dark:text-blue-200"
                    : "text-slate-500 dark:text-slate-200")
                }
              />
            </button>
          </div>
          <textarea
            onInput={resizeInput}
            id="chatinp"
            className={
              (reply.length > 0 ? "rounded-b-lg" : "rounded-lg") +
              " flex items-center pl-14 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-24 resize-none overflow-hidden duration-75 ease-in " +
              (rows === 1 ? "p-4 h-14" : rows === 2 ? "h-14" : "h-40")
            }
            placeholder="What are you thinking..."
          />
          <button
            disabled={val === "" || send}
            type="button"
            onClick={submitNewMessage}
            className="text-white absolute right-4 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-blue-500"
          >
            <Spinner size="sm" light={true} hidden={send ? false : true} />
            <span className={send ? "hidden" : ""}>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
