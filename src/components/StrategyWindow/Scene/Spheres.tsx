import React from 'react';
import Sphere from "./Sphere";
import {DragType, Vector3} from "./Types";



interface SpheresProps {
  spheres: Vector3[];
  onDragStart: (dragAction: {ix: number, dragType: DragType}) => void;
}

export default function Spheres({spheres, onDragStart}: SpheresProps) {
  return (
    <>
      {spheres.map((b, ix) => (
        <Sphere key={ix} position={[...b]} onDragStart={(dragType) => {
          onDragStart({ix, dragType});
        }} />
      ))}
    </>
  );
}