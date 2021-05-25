import React, {Suspense} from "react";
import Sphere from "./Scene/Sphere";
import {ObjectLoader} from "./Scene/ObjectLoader";
import {Vector3} from "./Scene/Types";

interface SoliderProps {
  position?: Vector3;
}

export const Soldier = ({position}: SoliderProps) => {

  return (
    <group
      position={position}
      scale={[2,2,2]}
    >
      <Suspense fallback={<Sphere position={[0,1,0]} size={0.3} />}>
        <group rotation={[-Math.PI/2, 0, 0]}>
          <ObjectLoader position={[0,0,0]}
                        mtlUrl="/soldier/14070_WWII_Soldier_with_Rife_v1_L1.mtl"
                        objUrl="/soldier/14070_WWII_Soldier_with_Rife_v1_L1.obj"
          />
        </group>
      </Suspense>
    </group>
  );
}