import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState , useEffect} from 'react';


export default function App() {
const [textsize, settextsize] = useState(20)
const [data, setData] = useState("");
const [filestate, setfilestate] = useState("도움말-내용을 입력해보세요.");

useEffect(() => {
  const saved = localStorage.getItem("textareadata");
  if (saved !== null) {
    setData(saved);
  }
}, []);


useEffect(() => {
  localStorage.setItem("textareadata", data);
  if (data !==""){
       setfilestate("저장됨-새로운 변동사항이 자동으로 저장됩니다.")
  } 
}, [data]);


useEffect(() => {
  const saved = localStorage.getItem("textsizedata");
  if (saved !== null) {
    settextsize(Number(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem("textsizedata", textsize);
}, [textsize]);


const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);



const askGemini = async () => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });
  setfilestate("내용을 생성 하는중-잠시만 기다려주세요.")
  const result = await model.generateContent("당신은 세상에 모든 지식을 알고 있는 페르소나 입니다.주어진값:"+data + "(주어진 값이 질문이면 질문에 대한 답을 적어주세요.) 에 대한 글을 작성해주세요.약 6문장정도 되어야 합니다.내용을 자세하고 디테일 있게 적어주세요.");
  const text = result.response.text();
  setData(data+"\n\n"+text)
};

function save(){
    setfilestate("도움말-저장할려면 'set as pdf'또는'pdf 로 저장'을클릭하고 save버튼을 클릭하세요.")
    window.print()
}

function summarize(){
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  }); 
  setfilestate("요약 하는중-잠시만 기다려주세요.")
  model.generateContent("당신은 유능한 요약전문가입니다.!important"+data + "를 요약해주세요.요약할때는 세밀한 내용을 잘 살리되 너무 감성적으로는 적지말고 일부 이성적인 내용은 이성적으로 살려주세요!출력물은 4문장 정도 이외로 작성해주세요.").then((result) => {
  const text = result.response.text();
  setData(text+"\n"+data)
  }
  )
}

function darkmode() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}
  return (
    <>
    <h1>무료 온라인 메모장</h1>
    <h2>온라인으로 무료로 메모를 작성할수있는 메모장</h2>
    <div className="bar">
       <button aria-label='글자크기 크게하기'><i class="fa-solid fa-plus" onClick={()=>settextsize(textsize+10)}></i></button>
       <button aria-label='글자크기 작게하기'><i class="fa-solid fa-minus" onClick={()=>settextsize(textsize-10)}></i></button>
       <button aria-label='인쇄하기' onClick={()=>window.print()}><i class="fa-solid fa-print"></i></button>
       <button aria-label='도움말 보기'><a id = "info" href='#footer'><i class="fa-regular fa-circle-question" title="도움말 보기"></i></a></button>
       <button aria-label='다운로드 하기' onClick={save}><i class="fa-solid fa-down-long"></i></button>
       <button aria-label='ai 글쓰기' onClick={askGemini}>작성된 내용을 바탕으로 AI글쓰기</button>
       <button aria-label='ai 요약하기' onClick={summarize}>AI요약하기</button>
       <button aria-label='다크모드 토글/라이트 모드' onClick={darkmode}><i class="fa-solid fa-moon" id='darkmodebutton'></i>다크모드</button>
    </div>
    <div id='state'>{filestate}</div>
    <main>
        <textarea id = "textarea" value={data} onChange={(e) => setData(e.target.value)} style={{fontSize:textsize+"px"}} placeholder='여기에 아무거나 입력해보세요.'></textarea>
    </main>
    <footer id = "footer">
        <h3>무료 온라인 메모장을 다양한 용도로 사용해보세요.</h3>
        <ul>
        <li>학교 과제에서 여러 아이디어를 빠르게 정리할수있습니다.</li>
        <li>회사 또는 직장에서 주어진 업무를 간편하게 정리할수있습니다.</li>
        <li>일상에서 기록해야 될 일들을 간편하게 기록할수있습니다.</li>
        </ul>
        <h3>지금 메모를 작성해보세요.</h3>
        <h4>무료 온라인 메모장(NotepadX.xyz)는 이 기기에 즉시 저장되므로 되므로 간편하고 빠르게 이용할수있습니다.지금 즉시 이용해보세요!</h4>
        <a className = "greenlink" href="https://www.flaticon.com/free-icons/notepad" title="notepad icons">Notepad icons created by Freepik - Flaticon</a>
        <br></br>
        <a className = 'greenlink' href='https://www.notepadxprivacy.netlify.app'>NotepadX 의 개인정보 처리약관</a>
    </footer>
    </>
  );
  
}


