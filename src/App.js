import { useState, useEffect } from 'react';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from "react-router-dom";

function App() {
  const [color, setColor] = useState("white");
  const [value, setValue] = useState("메모의 중요성");
  const [loading, setLoading] = useState("");
  const [va, setVa] = useState(undefined);

  // 글자 크기 변경
  function handleClick() {
    const a = document.getElementById("fontsize")
    if (a) {
      const size = a.value;
      document.getElementById("notepadarea").style.fontSize = size + "pt";
    }
  }


  // AI 작성 요청
  function ai() {
    const a = document.getElementById("ai");
    const number = document.getElementById("ainumber")
    if (a) {
      const textnumber = number
      const aivalue = a.value;
      setValue(value);
      setLoading("잠시만 기다려주십시오.");
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = aivalue+"에 대한 글을"+textnumber+"자 정도로 작성해주십시오";

      model.generateContent(prompt).then((response) => {
        const originaldata = localStorage.getItem("notepadvalue") || "";
        const content = response?.response?.text() || "";
        document.getElementById("notepadarea").value = content + originaldata;
        setLoading("작성이 완료됨");
        document.getElementById("loading").style.display = "block";
      });
    }
  }


  useEffect(() => {
    const interval = setInterval(() => {
      const notepad = document.getElementById("notepadarea");
      if (notepad) {
        localStorage.setItem("notepadvalue", notepad.value);
        setVa("자동저장이 완료됨");
      }
    }, 1);

    return () => clearInterval(interval); // cleanup
  }, []);


  useEffect(() => {
    const notepadvalue = localStorage.getItem("notepadvalue");
    if (notepadvalue !== null) {
      const notepad = document.getElementById("notepadarea");
      if (notepad) {
        notepad.value = notepadvalue;
        setVa("저장된 내용을 불러왔습니다.");
      }
    }
  }, []); // 빈 deps → 첫 렌더 때 한 번 실행

  return (
    <div className="App">
      <Link to="/save">
        <i id="c1" className="fa-solid fa-circle-notch"></i>
      </Link>
      <div id='helpguide'>
      <h4>환영합니다.메모를 저장하고 공유할려면 회색 원을 클릭해보세요.</h4>
      </div>

      <div className="bar">
        <button onClick={() => (document.getElementById("notepadarea").style.fontSize = "10pt")}>
          <i className="fa-solid fa-minus"></i>
        </button>
        <button onClick={() => (document.getElementById("notepadarea").style.fontSize = "30pt")}>
          <i className="fa-solid fa-plus"></i>
        </button>

        <input
          type="number"
          id="fontsize"
          placeholder="글자크기를 입력: 예) 10, 20"
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleClick}>적용</button>

        <input type="color" onChange={(e) => setColor(e.target.value)} />
        <input
          type="text"
          id="ai"
          placeholder="여기에 지능형 글쓰기를 작성"
          style={{ marginRight: "10px" }}
        />  
        <input
          type="number"
          id="ainumber"
          placeholder="ai가 작성할 글자수를 임력"
          style={{ marginRight: "10px" }}
        />
        <button onClick={ai}>작성요청</button>

          <input
          type="text"
          id="fontsize"
          placeholder="글자크기를 입력: 예) 10, 20"
          style={{ marginRight: "10px" }}
        />
        <button id="print" onClick={() => window.print()}>
          <i className="fa-solid fa-print"></i>
        </button>
      </div>
      

      <div className="loading" id="loading">
        <h5>{loading}</h5>
        <h5>{va}</h5>
      </div>

      <textarea id="notepadarea" style={{ color: color }}></textarea>

      <footer>
        <a href="https://www.flaticon.com/free-icons/document" title="document icons">
          Document icons created by Freepik - Flaticon
        </a>
        
      </footer>
    </div>
  );
}

export default App;
