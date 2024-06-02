import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };

  const handleClClick = () => {
    let newText = "";
    setText(newText);
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };

  const handleCapitalize = () => {
    let newText = text
      .split(" ")
      .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
      .join(" ");
    setText(newText);
  };

  const handleReverse = (event) => {
    let strArr = text.split("");
    strArr = strArr.reverse();
    let newText = strArr.join("");
    setText(newText);
  };

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  const handleListen = () => {
    if (isListening) {
      setIsListening(false);
      recognition.stop();
      return;
    }

    setIsListening(true);
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const [text, setText] = useState("");
  return (
    <>
      <div className="container" style={{color: props.mode==='dark'?'white':'black'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'grey':'white', color: props.mode==='dark'?'white':'black'}}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <div className="btn btn-info mx-2" onClick={handleUpClick}>
          Convert to upper case
        </div>
        <div className="btn btn-info mx-2" onClick={handleLoClick}>
          Convert to Lower case
        </div>
        <div className="btn btn-info mx-2" onClick={handleCapitalize}>
          Capatalize Text
        </div>
        <div className="btn btn-info mx-2" onClick={handleReverse}>
          Reverse Text
        </div>
        <div className="btn btn-primary mx-2" onClick={handleListen}>
          {isListening ? "Stop" : "Speach Text"}
          <i class="fa-solid fa-microphone m-2"></i>
        </div>
        <button
          type="submit"
          onClick={speak}
          className="btn btn-warning mx-2 my-2"
        >
          Listen <i class="fa-solid fa-volume-high m2"></i>
        </button>
        <div className="btn btn-danger mx-2" onClick={handleClClick}>
          Clear Text
        </div>
      </div>
      <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
        <h2>Your Text Summary</h2>
        <p>
          {text.split(" ").length} words and {text.length} alphabets
        </p>
        <p>{0.008 * text.split(" ").length} Minutes to read</p>
        <h2>Preview</h2>
        <p>{text}</p>
      </div>
    </>
  );
}
