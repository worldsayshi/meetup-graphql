import React, {PointerEventHandler} from 'react';
import {useEffect, useState} from "react";
import {Canvas} from "react-three-fiber";
import Spheres from "./Spheres";
import PointerPlane from "./PointerPlane";
import CustomOrbitControls from "./CustomOrbitControls";
import {DragType, Vector3} from "./Types";
import {QuadLine} from "./QuadLine";



export function SceneWrapper({ children, onPointerUp, pointerMoved, orbitEnabled = true }: {
  children: React.ReactNode,
  onPointerUp?: PointerEventHandler,
  pointerMoved?: (point: {x: number, y: number, z: number}) => void;
  orbitEnabled?: boolean;
}) {
  return (
    <Canvas onPointerUp={onPointerUp}>
      <ambientLight/>
      <pointLight position={[10, 10, 10]}/>
      {children}
      <PointerPlane
        pointerMoved={pointerMoved}
      />
      <CustomOrbitControls enabled={orbitEnabled}/>
    </Canvas>
  );
}

interface SceneViewProps {
  startData: Vector3[];
}

export function SceneView({startData}: SceneViewProps) {
  const [positions, setPositions] = useState<Vector3[]>(startData);
  const [pointerPos, setPointerPos] = useState<Vector3>([0,0,0]);
  const [dragStartId, setDragStartId] = useState<number | null>(null);
  const [dragType, setDragType] = useState<DragType>("Move");
  const [intermediateConnectPoint, setIConnectPoint] = useState<Vector3 | null>(null);

  // React to drag events
  useEffect(() => {
    if (dragStartId !== null) {
      let boxDatum = positions[dragStartId];
      if (dragType === "Move") {
        boxDatum[0] = pointerPos[0];
        boxDatum[1] = pointerPos[1];
        console.log(positions[dragStartId])
        setPositions(positions);
      } else if (dragType === "Connect") {
        setIConnectPoint(pointerPos);
      }
    }
  }, [pointerPos]);

  return (
    <SceneWrapper
      onPointerUp={() => {
        // XXX Create connection if hit
        setIConnectPoint(null);
        setDragStartId(null)
      }}
      pointerMoved={(point) => setPointerPos([point.x, point.y, point.z])}
      orbitEnabled={dragStartId === null}
    >
      <Spheres
        spheres={positions}
        onDragStart={({ix, dragType }) => {
          setDragType(dragType);
          setDragStartId(ix);
        }}
      />
      {intermediateConnectPoint && dragStartId !== null && (
        <QuadLine
          start={positions[dragStartId]}
          end={intermediateConnectPoint}
        />
      )}
    </SceneWrapper>
  );
}