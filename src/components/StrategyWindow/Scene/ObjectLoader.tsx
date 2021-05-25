import {useLoader, Vector3} from "react-three-fiber";
// @ts-ignore
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
// @ts-ignore
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

interface ObjectLoaderProps {
  mtlUrl: string;
  objUrl: string;
  position: Vector3;
}

export const ObjectLoader = ({ position, mtlUrl, objUrl }: ObjectLoaderProps) => {

  // @ts-ignore
  const materials = useLoader(MTLLoader, mtlUrl)
  const object = useLoader(OBJLoader, objUrl, loader => {
    materials.preload()
    loader.setMaterials(materials)
  })
  return <primitive position={position} object={object} />
}