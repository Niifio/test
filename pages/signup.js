import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaceConfig";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Oauth from "../components/Oauth";

const signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const router = useRouter();

  const onChange = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      router.push("/signin");
    } catch (error) {
      toast.error("Inappopriate User credentials");
    }
  };
  return (
    <>
      <div className="signinContent">
        <div>
          <div className="pageContainer">
            <header>
              <p className="pageHeader"></p>
            </header>

            <form onSubmit={onSubmit}>
              <input
                type="text"
                className="nameInput"
                placeholder="Name"
                id="name"
                value={name}
                onChange={onChange}
              />
              <input
                type="email"
                className="emailInput"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
              />

              <div className="passwordInputDiv">
                <input
                  type={showPassword ? "text" : "password"}
                  className="passwordInput"
                  placeholder="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                />
                <img
                  src="/visibilityIcon.svg"
                  alt="show password"
                  className="showPassword"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              </div>
              <Link href="/ForgotPassword" className="forgotPasswordLink">
                Forgot Password
              </Link>
              <div className="signUpBar">
                <p className="signUpText">Sign Up</p>
                <button className="signUpButton">
                  <Image
                    src="/keyboardArrowRightIcon.svg"
                    fill="#ffffff"
                    width="34px"
                    height="34px"
                  />
                </button>
              </div>
            </form>
            <Oauth />
            <div className="registerLink">
              <Link href="/signin">Sign In Instead</Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default signup;
