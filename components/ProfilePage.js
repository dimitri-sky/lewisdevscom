import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

import Projects from "./Projects";
import Blogs from "./Blogs";
import Experiences from "./Experiences";

const ProfilePage = ({ user }) => {
  const logout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <button onClick={logout}>Logout</button>
      {user && (
        <>
          <Projects userId={user.uid} />
          <Blogs userId={user.uid} />
          <Experiences userId={user.uid} />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
