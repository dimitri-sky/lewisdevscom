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
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">{user.displayName}</h1>
          <h3 className="mb-6 text-xl text-gray-600">Software Developer</h3>
          <button
            onClick={logout}
            className="px-6 py-2 font-semibold tracking-wide text-white transition duration-200 transform rounded-full bg-gradient-to-r from-red-500 to-black hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {user && (
            <>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-2xl font-bold">Projects</h2>
                <Projects userId={user.uid} />
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-2xl font-bold">Blogs</h2>
                <Blogs userId={user.uid} />
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-2xl font-bold">Experience</h2>
                <Experiences userId={user.uid} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
