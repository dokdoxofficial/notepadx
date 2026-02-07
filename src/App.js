import { useState, useEffect } from "react";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from "react-router-dom";


function App() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(40);
  const [color, setColor] = useState("#ffffffff");
  const [loading, setLoading] = useState("");
  const [showTool, setShowTool] = useState(false);
  const [maxLength, setMaxLength] = useState(10);

  function belight() {
    const element = document.body;
    element.classList.toggle("dark-mode");
  }
  /* 🔹 URL → 상태 복원 */
  function shareUrl() {
  const url = window.location.href;

  // 모바일/지원 브라우저: 네이티브 공유
  if (navigator.share) {
    navigator.share({
      title: "Notepadx 메모공유",
      text: "이 메모를 확인해보세요:",
      url,
    });
  } else {
    // 데스크톱: 클립보드 복사
    navigator.clipboard.writeText(url);
    setLoading("공유링크가 복사됨");
  }
}

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const savedText = params.get("text");
    const savedSize = params.get("size");
    const savedColor = params.get("color");

    if (savedText) setText(savedText);
    if (savedSize) setFontSize(Number(savedSize));
    if (savedColor) setColor(savedColor);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams({
        text,
        size: fontSize,
        color,
      });

      window.history.replaceState(
        null,
        "",
        `?${params.toString()}`
      );

      setLoading("저장됨");
    }, 2000);

    return () => clearTimeout(timer);
  }, [text, fontSize, color]);

  /* AI 글 작성 */
  async function aiWrite() {
    setLoading("AI 작성 중...");
    const genAI = new GoogleGenerativeAI(
      process.env.REACT_APP_API_KEY
    );
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = "너는 유능한 작문가야.다음 주제에 대해 창의력있고 필요한 글을 작성해줘.::\n" + text;
    const result = await model.generateContent(prompt);
    setText(text + "\n" + result.response.text());
    setLoading("AI작성이 완료됨");
  }

  //요약기능
  async function aiSummary() {
    if (!text.trim()) return;

    setLoading("요약하는중...");
    const genAI = new GoogleGenerativeAI(
      process.env.REACT_APP_API_KEY
    );
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite", 
});

    const prompt = `너의 역할은 요약api 야.다음 주제에 대해 요약을 1-2문장정도로 작성해줘.:\n${text}`;
    const result = await model.generateContent(prompt);
    setText(text + "\n" + result.response.text());
    setLoading("요약이 완료됨");
  }
 

  return (
    <div className="App">
       <Link to="/save">
        <i id="c1" className="fa-regular fa-circle"></i>
      </Link>
      <div className="bar">
  <button onClick={() => setFontSize((s) => s - 10)}>-</button>
  <button onClick={() => setFontSize((s) => s + 10)}>+</button>
  <input
    type="color"
    value={color}
    onChange={(e) => setColor(e.target.value)}
  />

  <button onClick={aiWrite}>지능화글쓰기</button>
  <button onClick={aiSummary}>작성된 내용을 요약하기</button>

  <button onClick={shareUrl}><i class="fa-regular fa-share-from-square"></i></button>
  <button onClick={() => window.print()}><i class="fa-solid fa-print"></i></button>

  <button onClick={() => window.open("https://google.com")}>
    <i class="fa-solid fa-magnifying-glass"></i>
  </button>
<button onClick={() => setShowTool((v) => !v)}>
  <i className="fa-solid fa-bars"></i>
</button>


   
</div>

      <div className="loading">{loading||"원을 클릭하면 이 파일을 삭제하게 됨니다."}</div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          fontSize: `${fontSize}px`,
          color,
        }}
        placeholder="창의적인 무언가를 임력해보세요..."
      />

<div className={`side-tool ${showTool ? "open" : ""}`}>
  <button onClick={() => setShowTool(false)}><i class="fa-solid fa-x"></i></button>
  <h2>아이디어 메니저</h2>
  <input type="number" placeholder="아이디어의 최대 길이를 지정..." onChange={(e) => setMaxLength(Number(e.target.value))}></input>
  <input type="text" maxLength={maxLength} placeholder="아이디어를 임력..."></input>
  <input type="text" maxLength={maxLength} placeholder="아이디어를 임력..."></input>
  <input type="text" maxLength={maxLength} placeholder="아이디어를 임력..."></input>
  <input type="text" maxLength={maxLength} placeholder="아이디어를 임력..."></input>
  <h2>새로운 기능 및 팁</h2>
  <ul>
    <li>url로 공유할때 카카오톡을 이용하면 모두보기를 클릭한후에 공유될수있어요.</li>
    <li>회색원을 클릭해보세요!그럼 작성한 파일이 삭제되요.</li>
  </ul>
  <footer className="footersection">
       <h5>라이트/다크 모드</h5>
        <button id="darkmodetogglebutton" onClick={belight}><i id="darkmodetoggle" class="fa-solid fa-circle-half-stroke"></i>라이트/다크 모드(클릭해서 변경해보세요!)</button>
        <h6>Deployed by Mit licence without Google gemini api</h6>
        <h5>NotepadX.netlify.app-NotepadX-v8.9.5</h5>
        <a href='https://notepadxprivacy.netlify.app'>privacy policy</a>
   </footer>

</div>


      
    </div>
    
  );
}

export default App;
