import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "./firebase";
import App from "../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isMember, setIsMember] = useState(false); 

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsMember(!!user); 
    });
    return () => unsub();
  }, []);

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .catch(err => alert(err.code));
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .catch(err => alert(err.code));
  };

  const logout = () => {
    signOut(auth);
    setIsMember(false);
  };

  if (user) {
    return (
      <>
        <p>로그인됨 - 멤버십 활성화됨</p>
        <button onClick={logout}>
          {user.email} 로그아웃
        </button>
        <br />

        {isMember && <App />}
      </>
    );
  }

  return (
    <div style={{ padding: 20 }} className="i">
      <h2>NotepadX|Account</h2>

      <input
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <br />

      <button onClick={signup}>회원가입</button>
      <button onClick={login}>로그인</button>

      <p>
        계속하면서 귀하는 NotepadX 개인정보처리약관에 동의하는 것으로 간주합니다.  
        https://notepadxprivacy.netlify.app
        새로운 notepadxprivacypolicy에 대해 알아볼려면 위에 페이지를 참조하십시오.
      </p>
    </div>
  );
}

export default Login;
