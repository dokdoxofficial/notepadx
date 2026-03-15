import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState , useEffect} from 'react';

export default function App() {
const [textsize, settextsize] = useState(25)
const [data, setData] = useState("");
const [filestate, setfilestate] = useState("저장을 준비하는중...");

useEffect(() => {
  const saved = localStorage.getItem("textareadata");
  if (saved !== null) {
    setData(saved);
  }
}, []);


useEffect(() => {
  localStorage.setItem("textareadata", data);
  if (data === "help"){
       setfilestate("도움말을 확인할려면 느낌표버튼을 클릭해보세요.ntx 를 입력해서 버전이름을 확인해보세요.")
  }
  else if (data === "ntx"){
       setfilestate("NotepadX v10-integrated Deployed under Mit licence except the icon")
  }else if (data !==""){
       setfilestate("저장되었습니다.새로운 변동사항이 자동으로 저장됩니다.")
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


  return (
    <>
    <h1>NotepadX</h1>
    <div className="bar">
       <button><i class="fa-solid fa-plus" onClick={()=>settextsize(textsize+10)}></i></button>
       <button><i class="fa-solid fa-minus" onClick={()=>settextsize(textsize-10)}></i></button>
       <button><a id = "info" href='#footer'><i class="fa-regular fa-circle-question"></i></a></button>
       <div id='state'>{filestate}</div>
    </div>
    <main>
        <textarea id = "textarea" value={data} onChange={(e) => setData(e.target.value)} style={{fontSize:textsize+"px"}} placeholder='아무글자나 임력해보세요!'></textarea>
    </main>
    <br></br>
    <footer id = "footer">
        <h3>NotepadX 를 이용해서 어떻게 메모해야되나요?</h3>
        <h4>NotepadX 에 큰 회색 영역에서 모든 글자들을 입력할수있습니다.이를 활용해서 다양한 
            용도에서 사용할수있습니다!예를 들어 학교에서 배운 새로운 지식을 적어두거나 무언가를 암기할때 또는 공부할때 이를 활용할수있습니다.또한 회사
            에서 여러 작업을 수행하면서 필요한 정보를 미리 입력할수도 있습니다.
         </h4>
         <h3>NotepadX 는 무료인가요?</h3>
         <h4>NotepadX 는 완전히 무료입니다.심지어 오픈소스 기반 프로젝트로써 여러 프라이버시를 보호합니다.NotepadX에 입력한 모든 내용은 임력한 디바이스에 저장되므로
            개인정보가 근본적으로 보호됩니다.또한 개인정보 보호 약관을 확인할수도 있습니다.<a classname = "greenlink" href='https://notepadxprivacy.netlify.app'>여기를 클릭해서 확인해보세요.</a>
         </h4>
        <h5>V10-Integrated Version</h5>
        <a className = "greenlink" href="https://www.flaticon.com/free-icons/notepad" title="notepad icons">Notepad icons created by Freepik - Flaticon</a>
    </footer>
    </>
  );
  
}


