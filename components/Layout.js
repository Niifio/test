import NavBar from "./Navbar";
import styles from "../styles/Layout.module.css";
const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
