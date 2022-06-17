import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/content/home/Home";
import Nav from "./components/navbar/Nav";
import Member from "./components/content/member/Member";
import firebase, { db } from "./services/firebase";
import Login from "./components/content/auth/Login";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import NotMember from "./components/content/member/NotMember";

function App() {
  const [user, setUser] = useState(null);
  const ref = collection(db, "members");
  const [verified, setVerified] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        checkUser(user);
      } else {
        setVerified(null);
      }
    });
  }, []);

  const checkUser = async (data) => {
    let q = query(ref, where("uid", "==", data.uid));
    let d = await getDocs(q);
    if (d.empty) {
      addMember(data);
    } else {
      isVerified(d.docs[0].id);
    }
  };

  const isVerified = async (id) => {
    let d = await getDoc(doc(db, "members", id));
    d.data().verified ? setVerified(true) : setVerified(false);
  };

  const addMember = (data) => {
    addDoc(ref, {
      name: data.displayName,
      requestAt: serverTimestamp(),
      uid: data.uid,
      verified: false,
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 w-full dark:text-slate-100 text-slate-800 overflow-hidden">
      <BrowserRouter>
        <Nav user={user} verify={verified} />
        {user === null && verified === null ? (
          <Login />
        ) : user && verified === false ? (
          <NotMember />
        ) : (
          <Routes>
            <Route
              index
              path="/"
              element={<Home user={user} verify={verified} />}
            />
            <Route
              path="member"
              element={<Member user={user} verify={verified} />}
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
