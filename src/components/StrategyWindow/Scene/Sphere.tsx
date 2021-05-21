import React, {useRef, useState} from "react";
// @ts-ignore
import * as THREE from "three/build/three.module";
import {MeshProps} from "react-three-fiber";
import {DragType, Vector3} from "./Types";

// From: https://codesandbox.io/s/y7f9k?file=/src/index.js

// For outline shader - Look at https://www.shadertoy.com/view/MsB3W1

function OutlineMaterial() {
  const fragmentShader = `
    varying vec3 Normal;
    varying vec3 Position;

    uniform vec3 Ka;
    uniform vec3 Kd;
    uniform vec3 Ks;
    uniform vec4 LightPosition;
    uniform vec3 LightIntensity;
    uniform float Shininess;

    vec3 phong() {
      vec3 n = normalize(Normal);
      vec3 s = normalize(vec3(LightPosition) - Position);
      vec3 v = normalize(vec3(-Position));
      vec3 r = reflect(-s, n);

      vec3 ambient = Ka;
      vec3 diffuse = Kd * max(dot(s, n), 0.0);
      vec3 specular = Ks * pow(max(dot(r, v), 0.0), Shininess);

      return LightIntensity * (ambient + diffuse + specular);
    }

    void main() {
      vec3 blue = vec3(0.0, 0.0, 1.0);
      gl_FragColor = vec4(blue*phong(), 1.0);
  }`
  const vertexShader = `
    varying vec3 Normal;
    varying vec3 Position;

    void main() {
      Normal = normalize(normalMatrix * normal);
      Position = vec3(modelViewMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const uniforms = {
    // phong material uniforms
    Ka: { value: new THREE.Vector3(1, 1, 1) },
    Kd: { value: new THREE.Vector3(1, 1, 1) },
    Ks: { value: new THREE.Vector3(1, 1, 1) },
    LightIntensity: { value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0) },
    LightPosition: { value: new THREE.Vector4(0.0, 2000.0, 0.0, 1.0) },
    Shininess: { value: 200.0 }
  }

  return <shaderMaterial attach="material"
                         uniforms={uniforms}
                         fragmentShader={fragmentShader} vertexShader={vertexShader} />;
}

type SphereProps = (MeshProps | { onDragStart?: (dragType: DragType) => void })
  & { position: Vector3, size?: number };

export default function Sphere(props: SphereProps) {

  const { onDragStart } = props;
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => {
  //   mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  // })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      //onClick={(event) => setActive(!active)}
      onPointerDown={onDragStart && ((event) => {
        event.stopPropagation();
        const {metaKey, ctrlKey, altKey, shiftKey} = event;
        //console.log("event", {metaKey, ctrlKey, altKey, shiftKey});
        onDragStart(ctrlKey ? "Connect": "Move");
      })}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      {/*<boxBufferGeometry args={[1, 1, 1]} />*/}
      <sphereBufferGeometry args={[props.size || 0.7, 30, 30 ]} attach="geometry" />
      <OutlineMaterial />
      {/*<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />*/}
    </mesh>
  )
}