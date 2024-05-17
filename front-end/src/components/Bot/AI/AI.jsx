import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useRef, useEffect } from "react";
import "./AI.css";

function App() {
  const [data, setData] = useState(undefined);
  const [inputText, setInputText] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [sliderVisible, setSliderVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 80,
  });
  const [sliderPosition, setSliderPosition] = useState({
    x: window.innerWidth - 200,
    y: window.innerHeight - 300,
  });
  const sliderRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonSize = 50;

  const handleButtonClick = (event) => {
    setSliderVisible(!sliderVisible);
    if (!sliderVisible) {
      document.addEventListener("click", handleOutsideClick, true);
      const buttonRect = event.target.getBoundingClientRect();
      setSliderPosition({
        x: buttonRect.left,
        y: buttonRect.top,
      });
    } else {
      document.removeEventListener("click", handleOutsideClick, true);
    }
  };

  const handleOutsideClick = (event) => {
    if (
      sliderRef.current &&
      !sliderRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setSliderVisible(false);
      document.removeEventListener("click", handleOutsideClick, true);
    }
  };

  const handleDoubleClick = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const newX = event.clientX;
    const newY = event.clientY;
    const maxX = window.innerWidth - buttonSize;
    const maxY = window.innerHeight - buttonSize;
    const minX = 0;
    const minY = 0;
    const adjustedX = Math.max(minX, Math.min(newX, maxX));
    const adjustedY = Math.max(minY, Math.min(newY, maxY));

    setButtonPosition({
      x: adjustedX,
      y: adjustedY,
    });
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  async function fetchDataFromGeminiProAPI() {
    try {
      if (!inputText) {
        alert("Please enter text!");
        return;
      }
      setLoading1(true);
      const genAI = new GoogleGenerativeAI(
        "AIzaSyAnhmR1EFQGoGR-IE0Iunh0VmX5q7Xjd0Q"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(inputText);
      const text = result.response.text();
      setLoading1(false);
      setData(text);
    } catch (error) {
      setLoading1(false);
      console.error("fetchDataFromGeminiAPI error: ", error);
    }
  }

  async function fetchDataFromGeminiProVisionAPI() {
    try {
      if (!inputText) {
        alert("Please enter text!");
        return;
      }
      setLoading2(true);
      const genAI = new GoogleGenerativeAI(
        "AIzaSyAnhmR1EFQGoGR-IE0Iunh0VmX5q7Xjd0Q"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const fileInputEl = document.querySelector("input[type=file]");
      const imageParts = await Promise.all(
        [...fileInputEl.files].map(fileToGenerativePart)
      );
      const result = await model.generateContent([inputText, ...imageParts]);
      const text = result.response.text();

      setLoading2(false);
      setData(text);
    } catch (error) {
      setLoading2(false);
      console.error("fetchDataFromGeminiAPI error: ", error);
    }
  }

  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  useEffect(() => {
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  return (
    <>
      <div
        className="slider-open"
        ref={buttonRef}
        style={{
          position: "fixed",
          left: buttonPosition.x + "px",
          top: buttonPosition.y + "px",
          width: buttonSize + "px",
          height: buttonSize + "px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "50%",
          display: sliderVisible ? "none" : "block",
          cursor: "pointer",
          textAlign: "center",
          lineHeight: buttonSize / 1.6 + "px",
        }}
        onMouseDown={handleDoubleClick}
        onClick={handleButtonClick}
      >iSee</div>
      {sliderVisible && (
        <div
          className="slider-visible"
          ref={sliderRef}
          style={{
            position: "fixed",
            left: sliderPosition.x + "px",
            top: sliderPosition.y + "px",
            maxHeight: "200px",
            overflowY: "auto",
            cursor: "default",
          }}
        >
          <SliderContent
            inputText={inputText}
            setInputText={setInputText}
            loading1={loading1}
            loading2={loading2}
            fetchDataFromGeminiProAPI={fetchDataFromGeminiProAPI}
            fetchDataFromGeminiProVisionAPI={fetchDataFromGeminiProVisionAPI}
            data={data}
          />
        </div>
      )}
    </>
  );
}

function SliderContent({
  inputText,
  setInputText,
  loading1,
  loading2,
  fetchDataFromGeminiProAPI,
  fetchDataFromGeminiProVisionAPI,
  data,
}) {
  return (
    <div className="container-Slider">
      <input type="file" style={{ marginBottom: "10px" }} />
      <input
        type="text"
        style={{ width: 200, marginBottom: "10px" }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        disabled={loading1}
        onClick={fetchDataFromGeminiProAPI}
        style={{
          marginRight: "10px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        {loading1 ? "Loading..." : "Text"}
      </button>
      <button
        disabled={loading2}
        onClick={fetchDataFromGeminiProVisionAPI}
        style={{ backgroundColor: "black", color: "white" }}
      >
        {loading2 ? "Loading..." : "Image to Text"}
      </button>
      <hr />
      <div className="container">
        <p>Response:</p>
        <div className="container-text">{data}</div>
      </div>
    </div>
  );
}

export default App;