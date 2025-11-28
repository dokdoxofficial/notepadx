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
    title: "사용자가 공유한 항목을 확인해보세요-notepadx.netlify.app",
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
      <p>현재 작성한 노트를 공유하십시오.</p>
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
        <h5>더 다양한 제품을 설치해보세요!--for android(.apk 및 .aab)</h5>
        <a href='/notepadx.apk' download>Notepadx for android(.apk)설치</a>
        <br></br>
        <a href='/timepro.apk' download>Timepro for android(.apk)설치</a>
        <br></br>
        <a href='/timepro.aab' download>Timepro for android(.aab)설치</a>
        <h6>Deployed by Mit licence without Google gemini api</h6>
        <h6>Thank you for contributors and users!</h6>
        <h5>notepadx.netlify.app - notepadx-v4.0.0</h5>
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