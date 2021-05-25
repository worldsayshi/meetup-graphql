import React, {PointerEventHandler} from 'react';
import {Canvas} from "react-three-fiber";
import PointerPlane from "./PointerPlane";
import CustomOrbitControls from "./CustomOrbitControls";
import {Vector3} from "./Types";


export function SceneWrapper({ children, onPointerUp, pointerMoved, orbitEnabled = true }: {
  children: React.ReactNode,
  onPointerUp?: PointerEventHandler,
  pointerMoved?: (point: {x: number, y: number, z: number}) => void;
  orbitEnabled?: boolean;
}) {
  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      onPointerUp={onPointerUp}
      camera={{
        position: [5, 5, 5]
      }}
    >
      <ambientLight/>
      <pointLight position={[0, 2, 10]}/>
      {children}
      <PointerPlane
        pointerMoved={pointerMoved}
      />
      <CustomOrbitControls enabled={orbitEnabled}/>
    </Canvas>
  );
}