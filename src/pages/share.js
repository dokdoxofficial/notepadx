import "../App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function List() {
  useEffect(() => {
    const savedData = localStorage.getItem("textareadata");
    const shareBtn = document.getElementById("shareBtn");
    shareBtn.addEventListener("click", async () => {
      // 브라우저 지원 여부 확인
      if (navigator.share) {
        await navigator.share({
          title: "NotepadX 공유",
          text: savedData,
        });
      }
    });
  }, []);

  return (
    <>
      <h2>계속 작업하기</h2>
      <Link to="/.">
        <button aria-label="작업 계속하기">작업 계속하기</button>
      </Link>
      <h2>공유 및 연결성</h2>
      <button id="shareBtn">메모 공유하기</button>
      <h2>새로운 기능 및 팁</h2>
      <div className = "box">
         <h4>무료 온라인 메모장(Notepadx.xyz) 에서 메로를 공유할려면 모바일 기기를 사용해보세요.일부 기기는 지원하지 않을수도 있습니다.</h4>
      </div>
    </>
    
  );
}
