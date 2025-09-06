import React, { useEffect, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";
import * as THREE from "three";
import { generateMouthCuesFromText } from "../../utils/mouthCuesService"; 
import {facialExpressions} from "./../../utils/mouthCuesService"

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

let setupMode = false;

export function Avatar({ audioBase64, text, facialExpression: initialExpression = "default", avatarAnimation, ...props }) {
  const { nodes, materials, scene } = useGLTF("/models/64f1a714fe61576b46f27ca2.glb");
  const { animations } = useGLTF("/models/animations.glb");
  const group = useRef();
  const { actions, mixer } = useAnimations(animations, group);

  const [animation, setAnimation] = useState(avatarAnimation || "Idle");
  const [facialExpression, setFacialExpression] = useState(initialExpression);
  const [blink, setBlink] = useState(false);
  const [winkLeft, setWinkLeft] = useState(false);
  const [winkRight, setWinkRight] = useState(false); 

  const [mouthCues, setMouthCues] = useState([]);
  /* eslint-disable react-hooks/exhaustive-deps */
  const [audio, setAudio] = useState(null);
  // const audioQueueRef = useRef([]);
  // const [isPlaying, setIsPlaying] = useState(false);



  const morphMeshesRef = useRef([]);
  const jawRef = useRef();
  const audioRef = useRef(null);
// console.log(Object.keys(actions));

  useEffect(() => {
    // console.log("passed raw animation",avatarAnimation)
    const morphMeshes = [];
    scene.traverse((child) => {
      if (child.isSkinnedMesh && child.morphTargetDictionary && child.morphTargetInfluences) {
        morphMeshes.push(child);
      }
    });
    morphMeshesRef.current = morphMeshes; 
  }, [scene]);

  useEffect(() => {
    if (avatarAnimation && avatarAnimation !== animation) {
      setAnimation(avatarAnimation);
    }
  }, [avatarAnimation]);

  useEffect(() => {
  if (initialExpression && initialExpression !== facialExpression) {
    setFacialExpression(initialExpression);
  }
  }, [initialExpression, facialExpression]);


  useEffect(() => {
   scene.traverse((bone) => {
     if (bone.name.toLowerCase().includes("jaw")) jawRef.current = bone;
   });
  }, [scene]);

 /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!actions[animation]) return;
    actions[animation].reset().fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5).play();
    return () => actions[animation]?.fadeOut(0.5);
  }, [animation, actions, mixer]);

  const lerpMorphTarget = (target, value, speed = 0.1) => {
  const meshes = morphMeshesRef.current;
  for (let i = 0; i < meshes.length; i++) {
    const child = meshes[i];
    const idx = child.morphTargetDictionary?.[target];
    if (idx === undefined || child.morphTargetInfluences?.[idx] === undefined) continue;

    child.morphTargetInfluences[idx] = THREE.MathUtils.lerp(
      child.morphTargetInfluences[idx],
      value,
      speed
    );
  }
};



 
/* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setMouthCues([]);
   console.log("passed raw animation",avatarAnimation)
    if (!text && !audioBase64) {
      if (audio) { 
      audio.pause(); 
      setAudio(null); 
    }
      return;
    }

    let cues = [];
    if (text) {
      cues = generateMouthCuesFromText(text || "");
    }

    setMouthCues(cues);

    if (audioBase64) {
      const a = new Audio(`data:audio/mp3;base64,${audioBase64}`);
      a.preload = "auto";
      const playAfter = setTimeout(async () => {
        try {
          if (avatarAnimation) {
            setAnimation(avatarAnimation);
          } else {
            setAnimation("Talking"); 
          }

          await a.play();
        } catch (e) {
          console.warn("Audio play prevented:", e);
        }
      }, 50);

      a.onended = () => {
        setMouthCues([]);
        setAnimation("Idle");
        // if (props.onAudioEnd) props.onAudioEnd(); 
      };

      audioRef.current = a;

      return () => {
        clearTimeout(playAfter);
        try { a.pause(); } catch (e) {}
      };
    }

    if (!audioBase64 && cues.length) {
      const start = performance.now();
      const fakeAudio = {
        currentTime: 0,
        _interval: setInterval(() => {
          fakeAudio.currentTime = (performance.now() - start) / 1000;
        }, 50),
        pause: () => clearInterval(fakeAudio._interval),
      };
      setAudio(fakeAudio);
      return () => {
        try { fakeAudio.pause(); } catch (e) {}
      };
    }

    return () => {};
  }, [text, audioBase64]);

  useEffect(() => {
    let blinkTimeout;
    const nextBlink = () => {
      blinkTimeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          nextBlink();
        }, 200);
      }, THREE.MathUtils.randInt(1000, 5000));
    };
    nextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  useFrame(() => {
    const mapping = facialExpressions[facialExpression] || {};

    const meshKeys = morphMeshesRef.current;
    if (!setupMode) {
      const first = meshKeys[0];
      if (first?.morphTargetDictionary) {
        Object.keys(first.morphTargetDictionary).forEach((key) => {
          if (key === "eyeBlinkLeft" || key === "eyeBlinkRight") return;
          lerpMorphTarget(key, mapping[key] || 0, 0.08);
        });
      } 
    }

    lerpMorphTarget("eyeBlinkLeft", blink || winkLeft ? 1 : 0, 0.5);
    lerpMorphTarget("eyeBlinkRight", blink || winkRight ? 1 : 0, 0.5);

    if (!audioRef.current || !mouthCues || mouthCues.length === 0) {
      Object.values(corresponding).forEach((value) => lerpMorphTarget(value, 0, 0.08));
      return;
    }

    const currentTime = Math.max(0, audioRef.current.currentTime || 0);

    let applied = null;
    for (let i = 0; i < mouthCues.length; i++) {
      const c = mouthCues[i];
      if (currentTime >= c.start && currentTime <= c.end) {
        const target = corresponding[c.value];
        if (target) {
          applied = target;
          lerpMorphTarget(target, 1, 0.2);
        }
        break; 
      }
    }

    if (applied === "viseme_AA" || applied === "viseme_O" || applied === "viseme_U") {
    if (jawRef.current) {
      jawRef.current.rotation.x = THREE.MathUtils.lerp(
        jawRef.current.rotation.x,
        -0.25, 
        0.2
      );
    }
  } else {
    if (jawRef.current) {
      jawRef.current.rotation.x = THREE.MathUtils.lerp(
        jawRef.current.rotation.x,
        0,
        0.2
      );
    }
  }

    Object.values(corresponding).forEach((viseme) => {
      if (viseme !== applied) lerpMorphTarget(viseme, 0, 0.08);
    });
  });

  useControls("FacialExpressions", {
    winkLeft: button(() => { setWinkLeft(true); setTimeout(() => setWinkLeft(false), 300); }),
    winkRight: button(() => { setWinkRight(true); setTimeout(() => setWinkRight(false), 300); }),
    facialExpression: { options: Object.keys(facialExpressions), onChange: setFacialExpression },
    enableSetupMode: button(() => (setupMode = true)),
    disableSetupMode: button(() => (setupMode = false)),
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    materials.Wolf3D_Hair.color.set(new THREE.Color("#7c3aed"));
  }, []);




  return (
    <group {...props} ref={group} dispose={null}>
      <primitive object={nodes.Hips} />
      {["Wolf3D_Body", "Wolf3D_Outfit_Bottom", "Wolf3D_Outfit_Footwear", "Wolf3D_Outfit_Top", "Wolf3D_Hair"].map((name) =>
        nodes[name] ? (
          <skinnedMesh key={name} name={name} geometry={nodes[name].geometry} material={materials[name]} skeleton={nodes[name].skeleton} />
        ) : null
      )}

      {["EyeLeft", "EyeRight", "Wolf3D_Head", "Wolf3D_Teeth"].map((name) =>
        nodes[name] ? (
          <skinnedMesh
            key={name}
            name={name}
            geometry={nodes[name].geometry}
            material={
              name.includes("Eye")
                ? materials.Wolf3D_Eye
                : name.includes("Teeth")
                ? materials.Wolf3D_Teeth
                : materials.Wolf3D_Skin
            }
            skeleton={nodes[name].skeleton}
            morphTargetDictionary={nodes[name].morphTargetDictionary}
            morphTargetInfluences={nodes[name].morphTargetInfluences} 
          />
        ) : null
      )}
    </group> 
  ); 
} 
 
useGLTF.preload("/models/64f1a714fe61576b46f27ca2.glb");
useGLTF.preload("/models/animations.glb");
