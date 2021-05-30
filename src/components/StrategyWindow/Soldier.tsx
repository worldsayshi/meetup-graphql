import React, {Suspense} from "react";
import Sphere from "./Scene/Sphere";
import {ObjectLoader} from "./Scene/ObjectLoader";
// @ts-ignore
import * as THREE from "three/build/three.module";
import {Vector3} from "./Scene/Types";
import Cylinder2 from "./Scene/Cylinder2";
import {MouseEvent} from "react-three-fiber";
import {Circle} from "@react-three/drei";

interface SoliderProps {
  position?: Vector3;
  selected: boolean;
  onSelect?: (event: MouseEvent) => void;
}

export const Soldier = ({position, selected, onSelect}: SoliderProps) => {
  // var hitGeom = new THREE.BoxBufferGeometry(1, 1, 1);
  // var hitMat = new THREE.MeshBasicMaterial({visible: false});
  // const hitbox = <mesh onClick={()=> console.log("HIT HITBOX")} geometry={hitGeom} material={hitMat} />

  return (
    <group
      //onPointerDown={() => console.log("onPointerDown")}
      position={position}
      scale={[2,2,2]}
    >
      {/*{selected && <Cylinder2 position={[0, 0, 0]}/>}*/}


      <Suspense fallback={<Sphere position={[0,1,0]} size={0.3} />}>
        <group onClick={(event) => {
          onSelect && onSelect(event);
        }} rotation={[-Math.PI/2, 0, 0]}>
          {selected && <mesh>
            <torusGeometry args={[0.65, 0.05, 5, 36]} />
            <meshStandardMaterial color={"limegreen"} />
          </mesh>}
          <ObjectLoader
            position={[0,-.135,0.1]}
            mtlUrl="/soldier/14070_WWII_Soldier_with_Rife_v1_L1.mtl"
            objUrl="/soldier/14070_WWII_Soldier_with_Rife_v1_L1.obj"

          />
        </group>
      </Suspense>
    </group>
  );
}