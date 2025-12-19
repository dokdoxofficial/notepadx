import image from '../image.jpg'

export default function NotFound() {
  return (
    <div>
      <h2>Error-404</h2>
      <p>NotepadX-Not Found error:404</p>
      <p>Sorry.I don't know anything!</p>
      <img src={image} alt='very cool hill-image'></img>
      <a href="https://notepadx.netlify.app">visit Notepadx.neltify.app</a>
    </div>
  );
}
