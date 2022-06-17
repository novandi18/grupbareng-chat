import { BanIcon } from "@heroicons/react/solid";

const NotMember = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-10 text-center select-none">
      <BanIcon className="h-24 w-24 text-rose-600 mb-5" />
      <span className="font-bold text-3xl mb-3">You are not a Member</span>
      <span className="text-sm dark:text-slate-300 text-slate-600">
        Check your email to find out if your member status has been verified or
        not.
      </span>
      <span className="text-sm dark:text-slate-300 text-slate-600">
        Refresh this page if you have received an email that you are a member
      </span>
    </div>
  );
};

export default NotMember;
