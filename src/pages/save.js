import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";

export default function Save() {


  
 

  return (
    <>
      <Link to="/">
        <i id='c'className="fa-regular fa-circle"></i>
      </Link>

      <main>
        <h2>작성된 파일이 삭제됨.</h2>
        <p>성공적으로 삭제되었습니다.</p>
        <a href='https://notepadx.netlify.app'>개발자</a>
        </main>
        
  

      
      <br />

    </>
  );
}

