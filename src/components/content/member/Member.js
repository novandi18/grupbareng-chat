import { onSnapshot, query, collection, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import ListMember from "./ListMember";
import RequestMember from "./RequestMember";
import { db } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import MemberSkeleton from "./skeleton/MemberSkeleton";

const Member = ({ user, verify }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = query(collection(db, "members"), where("uid", "!=", user.uid));
  const navigate = useNavigate();

  console.log(ref);

  useEffect(() => {
    document.title = "Members";

    if (verify === false) navigate("/");
    setLoading(true);

    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMembers(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="pt-16 pb-5 min-h-screen px-5 sm:px-16">
      <div className="py-5">
        <span className="text-3xl font-semibold">Members</span>
      </div>
      <div>
        {loading ? (
          <>
            <MemberSkeleton />
            <MemberSkeleton />
          </>
        ) : (
          <>
            <RequestMember members={members} />
            <ListMember members={members} />
          </>
        )}
      </div>
    </div>
  );
};

export default Member;
