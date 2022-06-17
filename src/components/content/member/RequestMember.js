import { Spinner } from "flowbite-react";
import { timestampDate } from "../../../features/func/timestampConvert";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { useState } from "react";

const RequestMember = ({ members }) => {
  const [loading, setLoading] = useState(false);

  const letsVerify = async (id) => {
    setLoading(true);
    await updateDoc(doc(db, "members", id), {
      verified: true,
      verifiedAt: serverTimestamp(),
    }).then(() => setLoading(false));
  };

  return (
    <div className="mb-5">
      <div className="mb-2">
        {members.filter((m) => m.verified === false).length > 0 ? (
          <span className="text-sm flex flex-row items-center">
            Join Requests
            <div className="px-2 rounded-md bg-yellow-300 text-slate-800 ml-2">
              {members.filter((m) => m.verified === false).length}
            </div>
          </span>
        ) : (
          ""
        )}
      </div>

      {members.filter((m) => m.verified === false).length < 1 ? (
        <div className="flex items-center">
          <BadgeCheckIcon className="w-14 h-14 text-green-600" />
          <span className="text-xl ml-2 font-semibold dark:text-slate-200 text-slate-700">
            No join request.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {members
            .filter((m) => m.verified === false)
            .map((member) => (
              <div
                className="px-4 py-3 flex justify-between items-center bg-slate-300 dark:bg-slate-800 rounded-lg w-full"
                key={member.id}
              >
                <div className="flex flex-col w-9/12 lg:w-11/12">
                  <span className="text-semibold font-medium text-bold truncate">
                    {member.name}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    {"Requested on " + timestampDate(member.requestAt.seconds)}
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => letsVerify(member.id)}
                    type="button"
                    className={
                      "bg-blue-700 px-4 py-1 rounded-md hover:bg-blue-800 duration-75 ease-in " +
                      (loading ? "hidden" : "")
                    }
                  >
                    <span className="text-sm text-slate-100">Accept</span>
                  </button>
                  <Spinner
                    size="md"
                    className={"mx-2 " + (loading ? "" : "hidden")}
                    light={true}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RequestMember;
