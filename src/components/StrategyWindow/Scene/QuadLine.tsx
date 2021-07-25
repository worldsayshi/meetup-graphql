import React from 'react';
// @ts-ignore
//import * as THREE from "three/build/three.module";
import {Line, CubicBezierLine, QuadraticBezierLine} from "@react-three/drei";
import {Vector3} from "./Types";
import {Color} from "react-three-fiber";

// For Fat lines:
// Look at this example: https://codesandbox.io/s/react-three-fiber-threejs-meshline-example-vl221?file=/src/index.js
// Start off with these lines: https://codesandbox.io/embed/react-three-fiber-line-1v25t

interface SLineProps {
  start: Vector3;
  end: Vector3;
  color?: Color | string | number;
  lineWidth?: number;
  dashed?: boolean;
}

export function SLine (props: SLineProps) {
  return (
    <>
      {/* @ts-ignore */}
      <Line
        points={[props.start, props.end]}
        color="black"
        lineWidth={5}
        dashed={false}
        {...props}
      />
    </>)
}


interface QuadLineProps {
  start: Vector3;
  end: Vector3;
  mid?: Vector3;
}

export function QuadLine (props: QuadLineProps) {
  return (
    <>
      {/* @ts-ignore */}
      <QuadraticBezierLine
        mid={[0, 0, 0]}
        {...props}
        color="black"
        lineWidth={5}
        dashed={false}
      />
    </>)
}

interface CubeLineProps {
  start: Vector3;
  end: Vector3;
  midA: Vector3;
  midB: Vector3;
}

export function CubeLine (props: CubeLineProps) {
  return (
    <>
      {/* @ts-ignore */}
      <CubicBezierLine
        {...props}
        color="black"
        lineWidth={5}
        dashed={false}
      />
    </>)
}