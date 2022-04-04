import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  useStore,
  useReactFlow,
  Node,
  useUpdateNodeInternals
} from "react-flow-renderer";

type Props = {
  id: string;
  connectedId: string;
  vocabId: number;
  value: string;
  canceledConnection: () => void;
};
export const IntStateHandle: React.FC<Props> = ({
  id,
  connectedId,
  vocabId,
  value,
  canceledConnection
}) => {
  const store = useStore();
  const reactFlowInstance = useReactFlow();
  const updateNode = useUpdateNodeInternals();
  const edge = useMemo(
    () =>
      reactFlowInstance
        .getEdges()
        .some((edge) => edge.id.includes(connectedId)),
    [store]
  );
  const nodes = useMemo(() => reactFlowInstance.getNodes(), [store]);

  const setValueAndUpdate = (reset = false) => {
    const node = reactFlowInstance.getNode(connectedId);
    if (node) {
      if (reset) {
        node.data.value = "";
        node.data.vocabId = 0;
      } else {
        node.data.value = value;
        node.data.vocabId = vocabId;
      }

      reactFlowInstance.setNodes([...nodes, node]);
      updateNode(connectedId);
    }
  };

  useEffect(() => {
    if (!edge) {
      setValueAndUpdate(true);
      canceledConnection();
    }
  }, [edge]);

  useEffect(() => {
    if (nodes) {
      setValueAndUpdate();
    }
  }, [connectedId, value, vocabId]);

  return <></>;
};
