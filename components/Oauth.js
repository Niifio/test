import { useRouter } from "next/router";
import { auth } from "../config/firebaceConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaceConfig";

const Oauth = () => {
  const router = useRouter();

  const onGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      router.push("/");
    } catch (error) {
      toast.error("Could not authorize with Google");
    }
  };
  return (
    <div className="socialLogin">
      <p>Sign {router.pathname === "/signin" ? "in" : "up"} with</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img src="/googleIcon.svg" alt="Google" className="socialIconImg" />
      </button>
    </div>
  );
};

export default Oauth;
