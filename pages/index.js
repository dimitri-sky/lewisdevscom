import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import MainPage from "../components/MainPage";
import ProfilePage from "../components/ProfilePage";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center min-h-screen py-6 bg-gradient-to-r from-red-600 to-blue-500 sm:py-12">
      <div className="container px-4 mx-auto">
        {user ? <ProfilePage user={user} /> : <MainPage />}
      </div>
    </div>
  );
};

export default Home;
