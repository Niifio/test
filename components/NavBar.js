import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import navStyles from "../styles/Nav.module.css";
import { auth } from "../config/firebaceConfig";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    }
  });
  const logout = (e) => {
    e.preventDefault();
    auth.signOut();
    router.push("/signin");
    setLoggedIn(false);
  };
  return (
    <>
      {loggedIn ? (
        <nav className={navStyles.nav}>
          <ul>
            <li onClick={logout}>
              <Link href="/signin">
                <a>Logout</a>
              </Link>
            </li>
            <li>
              <p>Welcome back</p>
            </li>
            <li>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={navStyles.nav}>
          <div>
            <ul>
              <li className={navStyles.home}>
                <Link href="/">
                  <img src="/favicon.ico" className={navStyles.home_image} />
                </Link>
              </li>
            </ul>
          </div>
          <ul>
            <li>
              <Link href="/signin">
                <a>Sign in</a>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <a>Sing up</a>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;
