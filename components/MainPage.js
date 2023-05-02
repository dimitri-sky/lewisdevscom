import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

const MainPage = () => {
  const router = useRouter();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      router.push(`/${result.user.uid}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="mb-6 text-5xl font-bold">Welcome to LewisDevs</h1>
      <p className="mb-6 text-lg">Sign in to create your developer portfolio</p>
      <button
        onClick={signInWithGoogle}
        className="px-6 py-2 font-semibold tracking-wide text-gray-800 bg-white rounded-full hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default MainPage;
