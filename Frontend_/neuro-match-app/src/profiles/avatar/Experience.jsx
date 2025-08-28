import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
// import { use } from "react";
import { useThree } from "@react-three/fiber";
import { Leva } from "leva";

export const Experience = ({ audioBase64, text, currentPhase, facialExpression, avatarAnimation }) => {

 const texture = useTexture("/textures/AIBG.jpg"); 
  const viewport = useThree((state) => state.viewport);
// console.log("Experience received audio:", audioBase64);
  return (
    <>
      <OrbitControls />
      <Leva hidden />
       <Avatar position={[0, -3, 6]} scale={2} audioBase64={audioBase64} text = {text} phase={currentPhase} facialExpression={facialExpression} avatarAnimation={avatarAnimation}/>
      <Environment preset="sunset"/>
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]}/>
        <meshBasicMaterial map={texture}/>
      </mesh>
    </>
  );
};
