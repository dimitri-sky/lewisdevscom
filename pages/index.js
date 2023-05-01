// pages/index.js
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import MainPage from "../components/MainPage";
import ProfilePage from "../components/ProfilePage";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <ProfilePage user={user} /> : <MainPage />;
};

export default Home;
