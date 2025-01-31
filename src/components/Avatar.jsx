/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 public/models/debarun.glb -o src/components/Avatar.jsx -r public
npx gltfjsx@6.2.3 public/models/debarun.glb -o src/components/Avatar2.jsx -r public
npx gltfjsx public/models/debarun.glb -o src/components/Avatar2.jsx -r public
*/

import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

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
  // Add more visemes if needed
};

export function Avatar({ audioUrl, lipsyncData, ...props }) {
  const [animation, setAnimation] = useState("Idle");
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/debarun.glb");
  const { animations: idleAnimation } = useFBX("/animations/Idle.fbx");
  const { animations: angryAnimation } = useFBX("/animations/Angry Gesture.fbx");
  const { animations: greetingAnimation } = useFBX("/animations/Standing Greeting.fbx");
  const { actions } = useAnimations([idleAnimation[0], angryAnimation[0], greetingAnimation[0]], group);

  idleAnimation[0].name = "Idle";
  angryAnimation[0].name = "Angry";
  greetingAnimation[0].name = "Greeting";

  useEffect(() => {
    if (actions && actions[animation]) {
      actions[animation].reset().fadeIn(0.5).play();
      return () => actions[animation].fadeOut(0.5);
    }
  }, [animation, actions]);

  useEffect(() => {
    if (audioUrl && lipsyncData) {
      const audio = new Audio(audioUrl);
      audio.play();

      const updateLipsync = () => {
        const currentAudioTime = audio.currentTime;

        // Reset all morph targets for lipsync to 0
        Object.values(corresponding).forEach((value) => {
          if (nodes.Wolf3D_Head && nodes.Wolf3D_Teeth) {
            const headTarget = nodes.Wolf3D_Head.morphTargetDictionary[value];
            const teethTarget = nodes.Wolf3D_Teeth.morphTargetDictionary[value];

            nodes.Wolf3D_Head.morphTargetInfluences[headTarget] = 0;
            nodes.Wolf3D_Teeth.morphTargetInfluences[teethTarget] = 0;
          }
        });

        // Apply active viseme based on audio's current time and mouthCues
        for (let i = 0; i < lipsyncData.mouthCues.length; i++) {
          const mouthCue = lipsyncData.mouthCues[i];

          if (currentAudioTime >= mouthCue.start && currentAudioTime <= mouthCue.end) {
            const visemeName = corresponding[mouthCue.value];

            if (nodes.Wolf3D_Head && nodes.Wolf3D_Teeth) {
              const headTarget = nodes.Wolf3D_Head.morphTargetDictionary[visemeName];
              const teethTarget = nodes.Wolf3D_Teeth.morphTargetDictionary[visemeName];

              nodes.Wolf3D_Head.morphTargetInfluences[headTarget] = 1;
              nodes.Wolf3D_Teeth.morphTargetInfluences[teethTarget] = 1;
            }
            break; // Stop processing further cues for this frame
          }
        }
      };

      const interval = setInterval(updateLipsync, 1000 / 60); // Update at 60 FPS

      audio.addEventListener("ended", () => {
        clearInterval(interval);
      });

      return () => {
        clearInterval(interval);
        audio.pause();
      };
    }
  }, [audioUrl, lipsyncData]);

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      {nodes.Wolf3D_Body && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
      )}
      {nodes.Wolf3D_Outfit_Bottom && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
      )}
      {nodes.Wolf3D_Outfit_Footwear && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
      )}
      {nodes.Wolf3D_Outfit_Top && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
      )}
      {nodes.Wolf3D_Hair && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
      )}
      {nodes.Wolf3D_Skin && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Skin.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Skin.skeleton}
        />
      )}
      {nodes.Wolf3D_Eye && (
        <skinnedMesh
          name="Wolf3D_Eye"
          geometry={nodes.Wolf3D_Eye.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.Wolf3D_Eye.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Eye.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Eye.morphTargetInfluences}
        />
      )}
      {nodes.EyeLeft && (
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
      )}
      {nodes.EyeRight && (
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
      )}
      {nodes.Wolf3D_Head && (
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
      )}
      {nodes.Wolf3D_Teeth && (
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
      )}
    </group>
  );
}

useGLTF.preload("/models/debarun.glb");
