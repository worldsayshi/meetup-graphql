import React from 'react';
import * as PropTypes from "prop-types";
import * as THREE from "three";

interface PointerPlaneProps {
  pointerMoved?: (point: {x: number, y: number, z: number}) => void;
}

export default function PointerPlane({pointerMoved}: PointerPlaneProps) {
  return (
    <>
    <group
      rotation={[-Math.PI/2, 0, 0]}
    >
      <mesh
        rotation={[0, 0, 0]}
        position={[0, 0, 0]}
        // @ts-ignore
        onPointerMove={pointerMoved && ((event) => pointerMoved(event.point))}
        material={new THREE.MeshBasicMaterial({visible: false})}
      >
        <planeBufferGeometry
          attach="geometry" args={[500, 500]}
        />
        {/*<meshStandardMaterial wireframe={true} attach="material" color="blue"/>*/}
      </mesh>
      </group>
      <gridHelper
        scale={[5,5,5]}
        //rotation={[-Math.PI/2, 0, 0]}
      />
    </>
  );
}

PointerPlane.propTypes = {pointerMoved: PropTypes.func};