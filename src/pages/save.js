import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import image from '../images/image.png'
import { Link } from "react-router-dom";

export default function Save() {


  
 

  return (
    <>
      <Link to="/">
        <i id='c'className="fa-regular fa-circle"></i>
      </Link>

      <main>
        <h2>성공!</h2>
        <p>성공적으로 삭제되었습니다.</p>
        </main>
        <img src={image} alt='wallpaper of beach'></img>
  

      
      <br />

    </>
  );
}

