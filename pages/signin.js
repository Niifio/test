import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Oauth from "../components/Oauth";

import Image from "next/image";

const signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        toast.success("Welcome to work force");
        router.push("/feed");
      }
    } catch (error) {
      toast.error("User does not exist");
    }
  };

  return (
    <>
      <div className="signinContent">
        <div>
          <div className="pageContainer">
            <header>
              <p className="pageHeader">Welcome Back</p>
            </header>

            <form onSubmit={onSubmit}>
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
              <div className="forgotPasswordLink">
                <Link href="/forgotpassword">Forgot Password</Link>
              </div>
              <div className="signInBar">
                <p className="signInText">Sign In</p>
                <button className="signInButton">
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
              <Link href="/signup">Sing Up Instead</Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default signin;
