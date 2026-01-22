import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";

export default function Save() {


  
  function belight() {
    const element = document.body;
    element.classList.toggle("dark-mode");
  }

  return (
    <>
      <Link to="/">
        <i id='c'className="fa-regular fa-circle"></i>
      </Link>

      <main>
        <h2>공유</h2>
        <p>이전 페이지로 이동해서 공유하세요.</p>
        </main>

      <div className='footersection'>
        <h5>라이트/다크 모드</h5>
        <button id="darkmodetogglebutton" onClick={belight}><i id="darkmodetoggle" class="fa-solid fa-circle-half-stroke"></i>라이트/다크 모드(클릭해서 변경해보세요!)</button>
      </div>
      
      <br />

       <footer className="footersection">
        <h6>Deployed by Mit licence without Google gemini api</h6>
        <h5>NotepadX.netlify.app-NotepadX-v8.0.1</h5>
        <a href='https://notepadxprivacy.netlify.app'>privacy policy</a>
      </footer>
    </>
  );
}

