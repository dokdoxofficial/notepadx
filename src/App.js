import { useState, useEffect } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("white");
  const [loading, setLoading] = useState("");
  const [va, setVa] = useState("");

  // 글자 크기 직접 입력 적용
  function handleClick() {
    const a = document.getElementById("fontsize");
    const area = document.getElementById("notepadarea");
    if (a && area) {
      area.style.fontSize = a.value + "pt";
    }
  }

  // AI 글 작성
  function ai() {
    const topic = document.getElementById("ai");
    const number = document.getElementById("ainumber");

    if (!topic || !number) return;

    setLoading("잠시만 기다려주십시오.");
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt =
      topic.value +
      "에 대한 글을 " +
      number.value +
      "자 정도로 작성해주십시오";

    model.generateContent(prompt).then((response) => {
      const content = response?.response?.text() || "";
      const notepad = document.getElementById("notepadarea");
      if (notepad) {
        notepad.value = content + "\n\n" + notepad.value;
      }
      setLoading("작성이 완료됨");
    });
  }

  //summarize
  function aiSummary() {
    const notepad = document.getElementById("notepadarea");
    if (!notepad || !notepad.value.trim()) {
      setLoading("요약할 내용이 없음");
      return;
    }

    setLoading("요약 중....");
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
다음 글을 핵심만 간단하게 요약해줘:

${notepad.value}
`;

    model.generateContent(prompt).then((response) => {
      const summary = response?.response?.text() || "";
      notepad.value =
        "다음 내용이 ai로 요약되었습니다.확인해보세요:\n\n" +
        summary +
        "\n\n--->요약이 완료됨\n\n" +
        notepad.value;

      setLoading("요약이 완료됨(google gemini 로 완료됨)");
    });
  }

  // 자동 저장 (1초)
  useEffect(() => {
    const interval = setInterval(() => {
      const notepad = document.getElementById("notepadarea");
      if (notepad) {
        localStorage.setItem("notepadvalue", notepad.value);
        setVa("자동 저장됨");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 저장된 메모 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("notepadvalue");
    const notepad = document.getElementById("notepadarea");
    if (saved && notepad) {
      notepad.value = saved;
      setVa("저장된 메모를 불러왔습니다.");
    }
  }, []);

  return (
    <div className="App">
      <Link to="/save">
        <i id="c1" className="fa-regular fa-circle"></i>
      </Link>

      <div className="loginnowsuggestion">
        <h3>회색 원을 클릭해서 작성한 메모를 공유하거나 저장하세요.</h3>
      </div>

      <div className="bar">
        <button onClick={() => (document.getElementById("notepadarea").style.fontSize = "20pt")}>
          <i className="fa-solid fa-minus"></i>
        </button>

        <button onClick={() => (document.getElementById("notepadarea").style.fontSize = "40pt")}>
          <i className="fa-solid fa-plus"></i>
        </button>

        <input type="number" id="fontsize" placeholder="글자 크기" />
        <button onClick={handleClick}>적용</button>

        <input type="color" onChange={(e) => setColor(e.target.value)} />

        <input type="text" id="ai" placeholder="AI 글 주제" />
        <input type="number" id="ainumber" placeholder="글자 수" />

        <button onClick={ai}>작성요청</button>
        <button onClick={aiSummary}>요약</button>

        <button id="print" onClick={() => window.print()}>
          <i className="fa-solid fa-print"></i>
        </button>

        <button onClick={() => setOpen(true)}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div className="loading" id="loading">
        <h5>{loading}</h5>
        <h5>{va}</h5>
      </div>

      <textarea
        id="notepadarea"
        style={{ color: color }}
      ></textarea>

      <div className={`sideBox ${open ? "active" : ""}`}>
        <button onClick={() => setOpen(false)}>
          <i id="cancel" className="fa-solid fa-xmark"></i>
        </button>

        <h3>빠른 검색</h3>
        <form action="https://www.bing.com/search" method="get" target="_blank">
          <input type="text" name="q" placeholder="검색어 입력..." />
          <button type="submit">검색</button>
        </form>
      </div>

      <footer>
        <a href="https://www.flaticon.com/free-icons/document">
          Document icons created by Freepik - Flaticon
        </a>
      </footer>
    </div>
  );
}

export default App;
