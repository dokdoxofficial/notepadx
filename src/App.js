import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState , useEffect} from 'react';

export default function App() {
const [textsize, settextsize] = useState(25)
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
  setData(text+"\n"+data)
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
  return (
    <>
    <h1>NotepadX</h1>
    <div className="bar">
       <button><i class="fa-solid fa-plus" onClick={()=>settextsize(textsize+10)}></i></button>
       <button><i class="fa-solid fa-minus" onClick={()=>settextsize(textsize-10)}></i></button>
       <button onClick={()=>window.print()}><i class="fa-solid fa-print"></i></button>
       <button><a id = "info" href='#footer'><i class="fa-regular fa-circle-question"></i></a></button>
       <button onClick={save}><i class="fa-solid fa-down-long"></i></button>
       <button onClick={askGemini}>작성된 내용으로 ai글쓰기</button>
       <button onClick={summarize}>내용요약</button>
    </div>
    <div id='state'>{filestate}</div>
    <main>
        <textarea id = "textarea" value={data} onChange={(e) => setData(e.target.value)} style={{fontSize:textsize+"px"}} placeholder='창의적인 무언가를 작성해보세요.'></textarea>
    </main>
    <footer id = "footer">
        <h3>NotepadX를 활용하기</h3>
        <h4>NotepadX 에 큰 회색 영역에서 모든 글자들을 입력할수있습니다.이를 활용해서 다양한 
            용도에서 사용할수있습니다!예를 들어 학교에서 배운 새로운 지식을 적어두거나 무언가를 암기할때 또는 공부할때 이를 활용할수있습니다.또한 회사
            에서 여러 작업을 수행하면서 필요한 정보를 미리 입력할수도 있습니다.
         </h4>
        <h3>저작권 정보</h3>
        <a className = "greenlink" href="https://www.flaticon.com/free-icons/notepad" title="notepad icons">Notepad icons created by Freepik - Flaticon</a>
        <h3>NotepadX 정보</h3>
        <h5>NotepadX v10.5-Deployed under Mit licence except the icon and Google Gemini API</h5>
        <a className='greenlink' href='https://github.com/dokdoxofficial/notepadx'>NotepadX Github 방문하기</a>
    </footer>
    </>
  );
  
}


