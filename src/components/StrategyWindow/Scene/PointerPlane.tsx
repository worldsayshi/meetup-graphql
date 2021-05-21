import React from 'react';
import * as PropTypes from "prop-types";


interface PointerPlaneProps {
  pointerMoved?: (point: {x: number, y: number, z: number}) => void;
}

export default function PointerPlane({pointerMoved}: PointerPlaneProps) {
  return (
    <>
      <mesh
        rotation={[0, 0, 0]}
        position={[0, 0, 0]}
        // @ts-ignore
        onPointerMove={pointerMoved && ((event) => pointerMoved(event.point))}
      >
        <planeBufferGeometry
          attach="geometry" args={[500, 500]}
        />
        <meshStandardMaterial wireframe={true} attach="material" color="blue"/>
      </mesh>
      <gridHelper rotation={[-Math.PI/2, 0, 0]} />
    </>
  );
}

PointerPlane.propTypes = {pointerMoved: PropTypes.func};