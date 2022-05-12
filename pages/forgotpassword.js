import { useState } from "react";
import { auth } from "../config/firebaceConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

const forgotpassword = () => {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    return setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email sent");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placehole="email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link className="forgotPasswordLink" href="/signin">
            Sign In
          </Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <Image src="/keyboardArrowRightIcon.svg" width={50} height={50} />
            </button>
          </div>
        </form>
      </main>
      <ToastContainer />
    </div>
  );
};

export default forgotpassword;
