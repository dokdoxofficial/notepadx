import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Save() {
  const [notes, setNotes] = useState([]);

  // 리스트 기능 추가
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notepadNotes")) || [];

    const singleValue = localStorage.getItem("notepadvalue");
    if (singleValue && !saved.some(n => n.text === singleValue)) {
      saved.unshift({ title: "notepadvalue", text: singleValue });
      localStorage.setItem("notepadNotes", JSON.stringify(saved));
    }

    setNotes(saved);
  }, []);

  // 항목 삭제 함수(important)
  const handleDelete = (text) => {
    const updated = notes.filter((note) => note.text !== text);
    setNotes(updated);
    localStorage.setItem("notepadNotes", JSON.stringify(updated));
  };

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
        <i id='c'className="fa-regular fa-circle"></i>
      </Link>

      <main>
        <h2>공유</h2>
        <p>현재 작성한 노트를 공유하십시오.</p>
        <button id="share" onClick={() => navigator.share(data)}>
          <i className="fa-solid fa-share-nodes"></i>공유
        </button>
        <hr />
        <h2>로그인-권장됨</h2>
        <Link to="/login">
        <button>로그인하기/새로운 계정을 만들기(클릭)</button>
        </Link>
        <h2>저장된 목록</h2>
        {notes.map((note) => (
          <New
            key={note.text}
            notetitle="제목이 없는 노트"
            summary={note.text}
            onDelete={() => handleDelete(note.text)}
          />
        ))}
      </main>

      <div className='footersection'>
        <h5>테마</h5>
        <button id="darkmodetogglebutton" onClick={belight}><i id="darkmodetoggle" class="fa-solid fa-circle-half-stroke"></i>다크모드/라이트모드(클릭해서 변경)</button>
      </div>

      <br />

      <footer className="footersection">
        <h6>Deployed by Mit licence without Google gemini api</h6>
        <h5>notepadx.netlify.app-notepadx-v6.0.0(stable)</h5>
        <a href='https://notepadxprivacy.netlify.app'>privacy policy</a>
      </footer>
    </>
  );
}

function New({ notetitle, summary, onDelete }) {
  return (
    <div className='new'>
      <h3>{notetitle}</h3>
      <h4>{summary}</h4>
      <br />
      <button onClick={onDelete}><i id = "deleteicon" className="fa-solid fa-trash-can"></i>제거</button>
    </div>
  );
}
