import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // URL에서 memo 불러오기
  const params = new URLSearchParams(window.location.search);
  const memoFromUrl = params.get("memo")
    ? decodeURIComponent(params.get("memo"))
    : "";

  const [va, setVa] = useState("");
  const [value, setValue] = useState(memoFromUrl);

  // 메모 변경 시 → URL에 자동 저장
  useEffect(() => {
    const encoded = encodeURIComponent(value);
    const newUrl = `${window.location.pathname}?memo=${encoded}`;
    window.history.replaceState(null, "", newUrl);
    setVa("URL 자동 저장됨");
  }, [value]);

  return (
    <div className="App">

      <div className="bar">
        <button id="print" onClick={() => window.print()}>
          <i className="fa-solid fa-print"></i>
        </button>
      </div>

      <textarea
        id="notepadarea"
        placeholder="여기에 메모를 작성하세요..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
