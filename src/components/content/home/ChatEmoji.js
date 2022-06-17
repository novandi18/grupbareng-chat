import { EmojiHappyIcon } from "@heroicons/react/solid";

const ChatEmoji = () => {
  return (
    <div>
      <button
        type="button"
        className="outline-none hover:bg-opacity-10 hover:bg-slate-900 p-1.5 rounded-full duration-75 ease-in active:bg-opacity-20"
      >
        <EmojiHappyIcon className="w-6 h-6 text-slate-500 dark:text-slate-200" />
      </button>
    </div>
  );
};

export default ChatEmoji;
