import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
export default function Save() {
  const [notes, setNotes] = useState([]);

//리스트 기능 추가
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notepadNotes")) || [];

  
    const singleValue = localStorage.getItem("notepadvalue");
    if (singleValue && !saved.some(n => n.text === singleValue)) {
      saved.unshift({ title: "notepadvalue", text: singleValue });
      localStorage.setItem("notepadNotes", JSON.stringify(saved));
    }

    setNotes(saved);
  }, []);

  // 공유 데이터
  const notepadvalue = localStorage.getItem("notepadvalue") || "";
  const data = {
    title: "사용자가 공유한 다음 항목을 확인해보세요.내용:",
    text: notepadvalue,
  };
function belight() {
  const element = document.body;
  element.classList.toggle("dark-mode");
}

  return (
    <>
        <Link to="/">
        <i id='c' class="fa-solid fa-circle-notch"></i>
       </Link>
      <main>
      <h2>공유</h2>
      <p>url 을 사용하여 빠른 공유</p>
      <button id="share" onClick={() => navigator.share(data)}>
        <i className="fa-solid fa-share-nodes"></i>
      </button>
      <hr />

      <h2>저장된 목록</h2>
      {notes.map((note) => (
        <New 
          key={note.text}
          notetitle="제목이 없는 노트"
          summary={note.text} 
        />
      ))}
      </main>   
      <div className='footersection'>
      <h2>설정</h2>
      <h5>테마</h5>
      <button onClick={belight}>다크모드/라이트모드(클릭해서 변경)</button>
      </div>
      <br></br>
      <footer className= "footersection">
        <h6>Deployed by Mit licence without Google gemini api</h6>
        <h6>Thank you for contributors and users!</h6>
        <h5>notepadxurl.netlify.app - notepadxurl-v5.0.0</h5>
        <a href='https://notepadxprivacy.netlify.app'>privacy policy</a>
      </footer>
      
    </>
  );
}

function New({ notetitle, summary }) {
  return (
    <div className='new'>
      <h3>{notetitle}</h3>
      <h4>{summary}</h4>
      <br />
    </div>
  );
}