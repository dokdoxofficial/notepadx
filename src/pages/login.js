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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
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
  };

  if (user) {
    return (
        <>
        <p>로그인됨-다음 계정으로 로그인 되었습니다!</p>
        <button onClick={logout}>{user.email}계정으로부터 로그아웃 </button>
        <br></br>
        <App></App>
        </>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>NotepadX-계정에 로그인/새로운 계정을 추가</h2>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <br></br>
      <button onClick={signup}>다음정보를 바탕으로 회원가입</button>
      <button onClick={login}>다음정보를 바탕으로 로그인</button>
      <p>계속하면서 귀하는 NotepadX의 개인정보처리약관에 동의하는것으로 간주합니다.</p>
    </div>
  );
}

export default Login;
