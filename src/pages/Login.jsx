import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { useAuth } from "../context/FakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [name, setName] = useState("Mahmoud");
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated} = useAuth();
  const navigator = useNavigate();
  function handlelogin(e) {
        e.preventDefault();
        if(email && password ) login(email, password);
  }
  useEffect(
    function () {
      if (isAuthenticated ) navigator("/app",{replace:true});
    },
    [navigator,isAuthenticated]
  )
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Name</label>
          <input
            type="text"
            id="email"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled
          />
        </div>
        <div className="  flex justify-center items-center w-full">
          <button onClick={(e) => {handlelogin(e)}}>
          Login
          </button>
        </div>
      </form>
    </main>
  );
}
