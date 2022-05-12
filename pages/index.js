import Head from "next/head";
import style from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <div className={style.main}>
        <div className={style.overlay}></div>
        <video src="videoBg.mp4" autoPlay loop muted />
        <div className={style.content}>
          <h1>Welcome</h1>
          <p>To my site.</p>
        </div>
      </div>
    </>
  );
}
