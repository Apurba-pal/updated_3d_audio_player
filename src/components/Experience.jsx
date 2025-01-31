import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Avatar } from "./Avatar";

export const Experience = ({ audioUrl, lipsyncData, setIsLoading }) => {
  const texture = useTexture("textures/card Back.png");
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <OrbitControls maxDistance={10} minDistance={2} />
      <Avatar position={[0, -1.5, 0]} scale={1} audioUrl={audioUrl} lipsyncData={lipsyncData} setIsLoading={setIsLoading} />
      <Environment preset="sunset" />
      <mesh>
      </mesh>
      <mesh position={[0, 0, -40]}>
        <boxGeometry args={[100, 100, 0.1]} />
        <meshBasicMaterial color="white" map={texture} />
      </mesh>
      <mesh position={[0, 0, 5]}>
        <meshBasicMaterial color="white" transparent opacity={0} />
      </mesh>
    </>
  );
};
