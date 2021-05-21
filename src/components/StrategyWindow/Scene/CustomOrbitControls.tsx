import React from 'react';
// @ts-ignore
import {extend, useThree, ReactThreeFiber} from "react-three-fiber";

import './setupRegTHREE';
import 'three/examples/js/controls/OrbitControls';
// @ts-ignore
extend({ OrbitControls: THREE.OrbitControls })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // @ts-ignore
      'orbitControls': ReactThreeFiber.Object3DNode<THREE.OrbitControls, typeof THREE.OrbitControls>;
    }
  }
}

export default function CustomOrbitControls ({ enabled }: { enabled: boolean }) {
  const {
    camera,
    gl: { domElement }
  } = useThree()
  return <orbitControls enabled={enabled} args={[camera, domElement]} />;
}