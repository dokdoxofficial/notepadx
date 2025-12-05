import { useState, useEffect } from 'react';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  // URL에서 memo 불러오기
  const params = new URLSearchParams(window.location.search);
  const memoFromUrl = params.get("memo")
    ? decodeURIComponent(params.get("memo"))
    : "";

  const [color, setColor] = useState("white");
  const [loading, setLoading] = useState("");
  const [va, setVa] = useState("");

  // textarea DOM에 접근 대신 state 사용
  const [value, setValue] = useState(memoFromUrl);

  // 메모 변경 시 → URL에 자동 저장
  useEffect(() => {
    const encoded = encodeURIComponent(value);
    const newUrl = `${window.location.pathname}?memo=${encoded}`;
    window.history.replaceState(null, "", newUrl);
    setVa("URL 자동 저장됨");
  }, [value]);

  // 글자 크기 변경
  function handleClick() {
    const input = document.getElementById("fontsize");
    const pad = document.getElementById("notepadarea");
    if (input && pad) {
      pad.style.fontSize = input.value + "pt";
    }
  }

  // AI 자동 작성
  function ai() {
    const a = document.getElementById("ai");
    const number = document.getElementById("ainumber");

    if (!a) return;

    setLoading("AI가 작성 중입니다. 잠시만 기다려 주세요.");

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `${a.value}에 대한 글을 ${number.value}자 정도로 작성해주십시오`;

    model.generateContent(prompt).then((response) => {
      const content = response?.response?.text() || "";
      setValue(content); // URL으로 자동 저장됨
      setLoading("AI 작성 완료됨");
    });
  }

  return (
    <div className="App">

      <div className="bar">
        {/* 글씨 축소 */}
        <button onClick={() => {
          const pad = document.getElementById("notepadarea");
          pad.style.fontSize = "10pt";
        }}>
          <i className="fa-solid fa-minus"></i>
        </button>

        {/* 글씨 확대 */}
        <button onClick={() => {
          const pad = document.getElementById("notepadarea");
          pad.style.fontSize = "30pt";
        }}>
          <i className="fa-solid fa-plus"></i>
        </button>

        <input id="fontsize" type="number" placeholder="글자 크기" />
        <button onClick={handleClick}>적용</button>

        <input type="color" onChange={(e) => setColor(e.target.value)} />

        <input id="ai" type="text" placeholder="AI 글쓰기 주제" />
        <input id="ainumber" type="number" placeholder="글자 수" />
        <button onClick={ai}>AI 작성</button>

        <button id="print" onClick={() => window.print()}>
          <i className="fa-solid fa-print"></i>
        </button>
      </div>

      <div className="loading" id="loading">
        <h5>{loading}</h5>
        <h5>{va}</h5>
      </div>

      <textarea
        id="notepadarea"
        style={{ color: color }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="여기에 메모를 작성하세요..."
      />

     
      
      <footer className="footersection">
        <a href="https://www.flaticon.com/free-icons/document" title="document icons">
        document icons created by Freepik - Flaticon
        </a>
        <h6>Deployed by Mit licence without Google gemini api</h6>
        <h5>notepadxurl.netlify.app-notepadxurl-baseversion--v5.5.0</h5>
        <a href='https://notepadxurl.netlify.app'>privacy policy</a>
      </footer>

    </div>
  );
}

export default App;
