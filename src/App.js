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
  setData(text+"\n\n"+data)
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
    <h1>무료 온라인 메모장</h1>
    <div className="bar">
       <button><i class="fa-solid fa-plus" onClick={()=>settextsize(textsize+10)}></i></button>
       <button><i class="fa-solid fa-minus" onClick={()=>settextsize(textsize-10)}></i></button>
       <button onClick={()=>window.print()}><i class="fa-solid fa-print"></i></button>
       <button><a id = "info" href='#footer'><i class="fa-regular fa-circle-question"></i></a></button>
       <button onClick={save}><i class="fa-solid fa-down-long"></i></button>
       <button onClick={askGemini}>작성된 내용을 바탕으로 AI글쓰기</button>
       <button onClick={summarize}>AI요약하기</button>
    </div>
    <div id='state'>{filestate}</div>
    <main>
        <textarea id = "textarea" value={data} onChange={(e) => setData(e.target.value)} style={{fontSize:textsize+"px"}} placeholder='창의적인 무언가를 작성해보세요.'></textarea>
    </main>
    <footer id = "footer">
        <h3>왜 NotepadX.xyz를 사용해야 되나요?</h3>
        <h5>우선 불필요한 광고가 없고 무료이며 근본적으로 개인정보가 보호됩니다.특히 localStorage 를 사용하기때문에
          브라우저에 메모한 내용이 저장됩니다.또 인공지능을 사용한 글쓰기&요약기능을 사용해서 영감을 얻을수도 있습니다.
        </h5>
        <h3>메모장을 어디에 활용할수있나요?</h3>
        <h5>메모장을 활용해서 실제로 유용하게 이용할수있습니다.예를 들어서,학생이라면 학교에서
          외우거나 공부한 내용들을 메모장에 적어볼수있습니다.또한 회사에서 해야될 작업을 수행할때 메모장을
          사용하면 여러 정보를 정리하고 분류하여 처리할수있습니다.또한 기록된 정보가 브라우저 상에 저장되므로 
          안심하고 사용할수있습니다.
         </h5>
        <h3>지금 메모를 작성해보세요.</h3>
        <h5>무료 온라인 메모장(NotepadX.xyz)는 이 기기에 즉시 저장되므로 개인정보가 보호됩니다.따라서 안심하고 이용할수있습니다.</h5>
        <a className = "greenlink" href="https://www.flaticon.com/free-icons/notepad" title="notepad icons">Notepad icons created by Freepik - Flaticon</a>
        
    </footer>
    </>
  );
  
}


