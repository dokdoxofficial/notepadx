import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [textsize, settextsize] = useState(25);
  const [data, setData] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("textareadata");
    if (saved !== null) {
      setData(saved);
    }
  }, []);

  useEffect(() => {
    // 현재 메모
    localStorage.setItem("textareadata", data);
  }, [data]);

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  const askGemini = async () => {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
      "당신은 세상에 모든 지식을 알고 있는 페르소나 입니다.주어진값:" +
        data +
        "(주어진 값이 질문이면 질문에 대한 답을 적어주세요.) 에 대한 글을 작성해주세요.약 6문장정도 되어야 합니다.내용을 자세하고 디테일 있게 적어주세요.",
    );
    const text = result.response.text();
    setData(data + "\n\n" + text);
  };

  function summarize() {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
    model
      .generateContent(
        "당신은 유능한 요약전문가입니다.!important" +
          data +
          "를 요약해주세요.요약할때는 세밀한 내용을 잘 살리되 너무 감성적으로는 적지말고 일부 이성적인 내용은 이성적으로 살려주세요!출력물은 4문장 정도 이외로 작성해주세요.",
      )
      .then((result) => {
        const text = result.response.text();
        setData(text + "\n" + data);
      });
  }

  return (
    <>
      <h1>무료 온라인 메모장</h1>
      <h2>무료로 메모할수있는 온라인 메모장 서비스</h2>
      <main>
        <div className="bar">
          <button
            aria-label="글자크기 크게하기"
            onClick={() => settextsize(textsize + 10)}
          >
            <i class="fa-solid fa-plus"></i>
          </button>
          <button
            aria-label="글자크기 작게하기"
            onClick={() => settextsize(textsize - 10)}
          >
            <i class="fa-solid fa-minus"></i>
          </button>
          <button aria-label="ai 글쓰기" onClick={askGemini}>
            <span>AI글쓰기</span>
          </button>
          <button aria-label="ai 요약하기" onClick={summarize}>
            <span>AI요약</span>
          </button>
          <button aria-label ="인쇄하기" onClick={window.print}><i class="fa-solid fa-print"></i></button>
   
        </div>
        <textarea
          id="textarea"
          value={data}
          onChange={(e) => setData(e.target.value)}
          style={{ fontSize: textsize + "px" }}
          placeholder="여기에 아무거나 입력해보세요."
        ></textarea>
      </main>
      <br></br>
      <footer className="box">
        <h3>무료 온라인 메모장을 다양한 용도로 사용해보세요.</h3>
        <ul>
        <li>학교 과제에서 여러 아이디어들을 빠르게 정리할 수 있습니다.</li>
        <li>회사에서 주어진 업무를 간편하게 처리할 수 있습니다.</li>
        <li>일상에서 기록해야 될 일들을 간편하게 기록할 수 있습니다.</li>
        </ul>
        <h3>지금 즉시 메모를 작성해보세요.</h3>
        <h4>무료 온라인 메모장(Notepadx.xyz)은 이 기기의 브라우저상에 즉시 저장되므로 되므로 간편하고 빠르게 이용할수있습니다.지금 즉시 이용해보세요!</h4>
        <a className = "greenlink" href="https://www.flaticon.com/free-icons/notepad" title="notepad icons">Notepad icons created by Freepik - Flaticon</a>
    </footer>
    </>
  );
}
