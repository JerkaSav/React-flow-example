import React, { useEffect } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  useStore,
  useUpdateNodeInternals
} from "react-flow-renderer";
import { Props } from "./NodeProps";
export const AddTag: React.FC<Props> = ({ id, data }) => {
  const updateNode = useUpdateNodeInternals();
  const store = useStore();
  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    reactFlowInstance.getEdges();
  }, [store]);

  useEffect(() => {
    updateNode(id);
  }, [data.value, data.vocabId]);

  return (
    <div className="basic">
      <Handle
        className="bigger-handle"
        id="main"
        type="target"
        position={Position.Top}
      />
      {JSON.stringify({ value: data.value, vocabId: data.vocabId })}
    </div>
  );
};
