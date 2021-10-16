import React, {useRef, useState} from "react";
import * as THREE from "three";
import {DragType, Vector3} from "./Types";
import {PointerEvent} from "react-three-fiber/canvas";



interface CylinderProps {
  onDragStart?: (event: PointerEvent) => void;
  position: Vector3;
  size?: number;
}

export default function Cylinder2(props: CylinderProps) {

  const { onDragStart } = props;
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1, 1, 1]}
      onPointerDown={onDragStart && ((event) => {
        event.stopPropagation();
        const {metaKey, ctrlKey, altKey, shiftKey} = event;
        onDragStart(event);
      })}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <cylinderBufferGeometry attach="geometry" args={[1, 1, 0.4, 32]} />
      <meshToonMaterial />
    </mesh>
  )
}