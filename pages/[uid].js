import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import ProfilePage from "../components/ProfilePage";

const UserProfilePage = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user && user.uid === uid ? <ProfilePage user={user} /> : <div>Access Denied</div>;
};

export default UserProfilePage;
