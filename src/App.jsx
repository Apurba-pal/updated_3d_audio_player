import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import React, { useState, useEffect } from "react";

function App() {
  const [audioUrl, setAudioUrl] = useState(null);
  const [lipsyncData, setLipsyncData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.globaltfn.tech/getsound?request=sample_request`, // Replace with your actual request
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
      setIsLoading(false); // Re-enable the play button on error
    }
  };

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 3], fov: 35, near: 0.1, far: 1000 }}
      >
        <color attach="background" args={["black"]} />
        <Experience audioUrl={audioUrl} lipsyncData={lipsyncData} setIsLoading={setIsLoading} isLoading={isLoading} />
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
        <button onClick={handlePlay} style={{ padding: "10px 20px" }} disabled={isLoading}>
          {isLoading ? "Loading..." : "Play"}
        </button>
      </div>
    </>
  );
}

export default App;
