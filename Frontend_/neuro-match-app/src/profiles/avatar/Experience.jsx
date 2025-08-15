import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
// import { use } from "react";
import { useThree } from "@react-three/fiber";
export const Experience = () => {

 const texture = useTexture("/textures/AIBG.jpg"); 
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <OrbitControls />
      <Avatar position={[0,-3,6]} scale={2}/>
      <Environment preset="sunset"/>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]}/>
        <meshBasicMaterial map={texture}/>
      </mesh>
    </>
  );
};
