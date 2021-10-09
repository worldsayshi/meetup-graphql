import React from "react";
import {Soldier} from "./Soldier";
import {SLine} from "../Scene/QuadLine";
import {useSceneContext} from "../Scene/SceneContext";

export function Armies() {
  const { state, dispatchLocalAction } = useSceneContext();

  return (
    <>
      {state && Object.values(state?.pieceLookup).map(({id, current_node, planned_node_id}) => (
        <React.Fragment key={"army_"+id}>
          <Soldier
            key={"army_"+id}
            selected={state.selectedPiece === id}
            position={current_node.position}
            onSelect={() => {
              dispatchLocalAction({ type: "select_piece", selectedPiece: id });
            }}
          />
          {state.nodesLookup && planned_node_id && <SLine
            color="yellow"
            lineWidth={8}
            start={current_node.position}
            end={state.nodesLookup[planned_node_id]?.position}
          />}
        </React.Fragment>
      ))}
    </>
  );
}