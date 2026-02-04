import image from '../images/image.png'

export default function NotFound() {
  return (
    <div>
      <h2>oh No!</h2>
      <p>NotepadX-Not Found error:404</p>
      <a href="https://notepadx.netlify.app">visit Notepadx.neltify.app</a>
      <img src={image} alt='wallpaper of beach'></img>
    </div>
  );
}
