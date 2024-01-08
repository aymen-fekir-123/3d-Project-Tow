import SoundSection from "./componets/SoundSection";
import Jumbotron from "./componets/jumbotron";
import Nav from "./componets/nav";
import WebgiViewr from "./componets/WebgiViewr";
import DisplaySection from "./componets/DisplaySection";
import { useRef } from "react";
import Loader from "./componets/loader";
function App() {

  const WebgiViewrref = useRef(null)

  const contentref = useRef(null)
  const handellPreview = () => {
    WebgiViewrref.current.triggerPreview()
  }

  return (
    <div className="App">
      <Loader/>
      <div id="content" ref={contentref}>

        <Nav/>
        <Jumbotron/>
        <SoundSection/>
        <DisplaySection triggerPreview={handellPreview}/>

      </div>
      <WebgiViewr contentref={contentref} ref={WebgiViewrref}/>
    </div>
  );
}

export default App;
