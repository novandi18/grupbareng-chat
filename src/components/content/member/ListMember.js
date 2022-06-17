import { timestampDate } from "../../../features/func/timestampConvert";
import { Modal } from "flowbite-react/lib/esm/components";
import { ExclamationIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Spinner } from "flowbite-react/lib/esm/components/Spinner";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";

const ListMember = ({ members }) => {
  const [modal, setModal] = useState(false);
  const [kick, setKick] = useState("");
  const [kickProcess, setKickProcess] = useState(false);

  const kickMember = async () => {
    setKickProcess(true);
    await updateDoc(doc(db, "members", kick), {
      verified: false,
    }).then(() => {
      setKickProcess(false);
      setModal(false);
    });
  };

  const closeModal = () => {
    setModal(false);
    setKick("");
  };

  return (
    <div>
      <div className="mb-2 border-b pb-2 dark:border-slate-700">
        <span className="text-sm flex flex-row items-center">
          List Members
          <div className="px-2 rounded-md bg-yellow-300 text-slate-800 ml-2">
            {members.filter((m) => m.verified).length}
          </div>
        </span>
      </div>

      <div className="flex flex-col">
        {members
          .filter((m) => m.verified)
          .map((member) => (
            <div
              className="flex justify-between items-center py-1"
              key={member.id}
            >
              <span className="truncate">{member.name}</span>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-600">
                  {"Joined on " +
                    (member.verifiedAt !== null
                      ? timestampDate(member.verifiedAt.seconds)
                      : "")}
                </span>
                <button
                  onClick={() => {
                    setModal(true);
                    setKick(member.id);
                  }}
                  type="button"
                  className="bg-red-600 text-sm text-white rounded-md ml-3 px-3 py-1 hover:bg-red-700 duration-75 ease-in"
                >
                  Kick
                </button>
              </div>
            </div>
          ))}
      </div>

      <Modal show={modal} size="md" popup={true} onClose={() => closeModal()}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <ExclamationIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to kick this member?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => kickMember()}
                disabled={kickProcess}
                className="text-sm px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 duration-75 ease-in"
              >
                Yes, Kick{" "}
                <Spinner
                  light={true}
                  className={"ml-1 " + (kickProcess ? "" : "hidden")}
                  size="sm"
                />
              </button>
              <button
                onClick={() => closeModal()}
                className="text-sm px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-500 dark:text-slate-100 duration-75 ease-in text-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListMember;
