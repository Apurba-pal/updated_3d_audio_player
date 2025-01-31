import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Avatar } from "./Avatar";

export const Experience = ({ audioUrl, lipsyncData }) => {
  const texture = useTexture("textures/card Back.png");
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <OrbitControls maxDistance={10} minDistance={2} />
      <Avatar position={[0, -1.5, 0]} scale={1} audioUrl={audioUrl} lipsyncData={lipsyncData} />
      <Environment preset="sunset" />
      <mesh>
        {/* <planeGeometry args={[viewport.width, viewport.height]} /> */}
        {/* <planeGeometry args={[viewport.width, viewport.height]} rotateX={90} /> */}
        {/* <meshBasicMaterial map={texture} /> */}
        {/* <meshBasicMaterial color="white" /> */}
      </mesh>
      <mesh position={[0, 0, -40]}>
        <boxGeometry args={[100, 100, 0.1]} />
        <meshBasicMaterial color="white" map={texture} />
      </mesh>
      <mesh position={[0, 0, 5]}>
        {/* <boxGeometry args={[1, 1, 1]} /> */}
        {/* <planeGeometry args={[10,10]}/> */}
        <meshBasicMaterial color="white" transparent opacity={0} />
      </mesh>
      {/* <mesh position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 10, 0.1]} />
        <meshBasicMaterial color="black" />
      </mesh> */}
      {/* <mesh position={[5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 10, 0.1]} />
        <meshBasicMaterial color="black" />
      </mesh> */}
      {/* <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[10, 10, 0.1]} />
        <meshBasicMaterial color="black" />
      </mesh> */}
      {/* <mesh position={[0, -5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[10, 10, 0.1]} />
        <meshBasicMaterial color="black" />
      </mesh> */}
    </>
  );
};
