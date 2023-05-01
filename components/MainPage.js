import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router"; // Import the useRouter hook

const MainPage = () => {
  const router = useRouter(); // Initialize the useRouter hook

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      router.push(`/${result.user.uid}`); // Navigate to the user's profile page URL
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome to LewisDevs</h1>
      <p>Sign in to create your developer portfolio</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default MainPage;
