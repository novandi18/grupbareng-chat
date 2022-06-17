const ChatSkeleton = () => {
  return (
    <div className="flex flex-col px-5 md:px-0 pt-3 animate-pulse">
      <div className="dark:bg-slate-700 bg-slate-300 rounded-lg h-10 w-28 mb-3"></div>
      <div className="dark:bg-slate-700 bg-slate-300 rounded-lg h-10 w-56 mb-3"></div>
      <div className="flex flex-col items-end">
        <div className="dark:bg-slate-700 bg-slate-300 rounded-lg h-10 w-36 mb-3"></div>
        <div className="dark:bg-slate-700 bg-slate-300 rounded-lg h-10 w-80 mb-3"></div>
      </div>
      <div className="dark:bg-slate-700 bg-slate-300 rounded-lg h-10 w-48 mb-3"></div>
    </div>
  );
};

export default ChatSkeleton;
