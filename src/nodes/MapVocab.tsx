import React, { useEffect, useMemo, useState } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  useStore,
  useUpdateNodeInternals
} from "react-flow-renderer";
import { Props } from "./NodeProps";
import { IntStateHandle } from "./handlers/IntStateHandle";

export const MapVocab: React.FC<Props> = ({ data, id }) => {
  const [vocabId, setVocabId] = useState(0);
  const [connectedNodeId, setConnectedNodeId] = useState("");
  const updateNode = useUpdateNodeInternals();
  const store = useStore();
  const reactFlowInstance = useReactFlow();

  const hasEdge = useMemo(
    () => reactFlowInstance.getEdges().some((edge) => edge.id.includes(id)),
    [store]
  );

  const onConnect = ({ target }) => {
    setConnectedNodeId(target);
  };

  const canceledConnection = () => {
    setConnectedNodeId("");
  };

  useEffect(() => {
    setVocabId(Math.floor(Math.random() * data.value.length));
  }, [hasEdge, data.value]);

  useEffect(() => {
    updateNode(id);
  }, [vocabId]);

  return (
    <div className="basic bigger">
      <Handle
        className="bigger-handle handle-top"
        id="main"
        type="target"
        position={Position.Top}
      />
      <>
        <p>{data.value}</p>
        <p>{vocabId}</p>
      </>
      <Handle
        className="bigger-handle handle-bottom"
        id="vocab"
        type="source"
        position={Position.Bottom}
        onConnect={onConnect}
        isValidConnection={({ target }) => target.includes("addTag")}
      />
      <IntStateHandle
        id={id}
        connectedId={connectedNodeId}
        vocabId={vocabId}
        value={data.value}
        canceledConnection={canceledConnection}
      />
    </div>
  );
};
