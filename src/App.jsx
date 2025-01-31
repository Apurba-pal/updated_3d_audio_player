import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import React, { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [lipsyncData, setLipsyncData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    setIsLoading(true);
    setText(""); // Clear the input box immediately
    try {
      const response = await fetch(
        `https://api.globaltfn.tech/getsound?request=${encodeURIComponent(text)}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const audioUrl = `https://api.globaltfn.tech/${data.audio}`;
      const lipsyncData = data.lipSync;
      setAudioUrl(audioUrl);
      setLipsyncData(lipsyncData);
    } catch (error) {
      console.error("Error fetching sound:", error);
    }
  };

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.addEventListener("play", () => setIsLoading(false));
      audio.play();
    }
  }, [audioUrl]);

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 3], fov: 35, near: 0.1, far: 1000 }}
      >
        <color attach="background" args={["black"]} />
        <Experience audioUrl={audioUrl} lipsyncData={lipsyncData} />
        {/* Post-processing effects */}
        {/* <EffectComposer>
          <DepthOfField
            focusDistance={0.02} // Distance to focus on (between 0 and 1)
            focalLength={0.1} // Lens focal length
            bokehScale={2} // Bokeh intensity (higher = more blur)
          />
        </EffectComposer> */}
      </Canvas>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          background: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text"
          style={{ marginRight: "10px", padding: "5px", width: "300px" }}
        />
        <button onClick={handleSend} style={{ padding: "5px 10px" }} disabled={isLoading}>
          {isLoading ? "Loading..." : "Send"}
        </button>
      </div>
    </>
  );
}

export default App;
