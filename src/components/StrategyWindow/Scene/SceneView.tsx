import React, {MouseEventHandler, PointerEventHandler} from 'react';
import {Canvas} from "react-three-fiber";
import PointerPlane from "./PointerPlane";
import CustomOrbitControls from "./CustomOrbitControls";
import {useContextBridge} from "@react-three/drei";

interface SceneWrapperProps {
  children: React.ReactNode,
  onPointerUp?: PointerEventHandler,
  onClick?: MouseEventHandler,
  pointerMoved?: (point: {x: number, y: number, z: number}) => void;
  orbitEnabled?: boolean;
  bridgeContexts?: React.Context<any>[];
}

export function SceneWrapper(props: SceneWrapperProps) {
  const {
    children,
    onPointerUp,
    pointerMoved,
    orbitEnabled = true,
    bridgeContexts = [],
  } = props;
  const ContextBridge = useContextBridge(...bridgeContexts)

  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      onPointerUp={onPointerUp}
      //onClick={onClick || undefined}
      camera={{
        position: [5, 5, 5]
      }}
    >
      <ContextBridge>
        <ambientLight/>
        <pointLight position={[0, 2, 10]}/>
        {children}
        <PointerPlane
          pointerMoved={pointerMoved}
        />
        <CustomOrbitControls enabled={orbitEnabled}/>
      </ContextBridge>
    </Canvas>
  );
}