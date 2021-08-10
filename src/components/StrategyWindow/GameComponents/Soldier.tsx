import React, {Suspense} from "react";
import Sphere from "../Scene/Sphere";
import {ObjectLoader} from "../Scene/ObjectLoader";
import {Vector3} from "../Scene/Types";
import {MouseEvent} from "react-three-fiber";

interface SoliderProps {
  position?: Vector3;
  selected: boolean;
  onSelect?: (event: MouseEvent) => void;
}

// TODO Animated solider and stuff:
//  Take a look at below tutorial and Archer and Paladin models on mixamo.com:
//  https://codeworkshop.dev/blog/2021-01-20-react-three-fiber-character-animation/

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
        <group
          onClick={(event) => {
            onSelect && onSelect(event);
          }}
          rotation={[-Math.PI/2, 0, 0]}
        >
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