import React, { useState, useEffect, useRef } from "react";
import { template } from "../../data";
import {
  useReactFlow,
  useStore,
  Node,
  useUpdateNodeInternals
} from "react-flow-renderer";

type Props = {
  connectedNodeFalseId: string;
  connectedNodeTrueId: string;
  nodeId: string;
  value: string;
  result: boolean;
  canceledConnection: (nodeToDisconnect: string) => void;
  andOr: boolean;
};

export const BooleanStateHandleV2: React.FC<Props> = ({
  connectedNodeFalseId,
  connectedNodeTrueId,
  nodeId,
  value,
  result,
  canceledConnection,
  andOr
}) => {
  const store = useStore();
  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes] = useState<Node[]>();
  const [TrueEdge, setTrueEdge] = useState<boolean>();
  const [FalseEdge, setFalseEdge] = useState<boolean>();

  const connectionFalseId = `reactflow__edge-${nodeId}false-${connectedNodeFalseId}`;
  const connectionTrueId = `reactflow__edge-${nodeId}true-${connectedNodeTrueId}`;
  const updateNode = useUpdateNodeInternals();

  const storedResult = useRef<boolean | undefined>();

  const setValueAndUpdate = (id, reset = false) => {
    const node = reactFlowInstance.getNode(id);

    if (node) {
      if (reset) {
        node.data.value = "";
        node.data.templates = template;
      } else {
        node.data.value = value;
      }
      console.log(node);
      reactFlowInstance.setNodes([...nodes, node]);
      updateNode(id);
    }
  };

  useEffect(() => {
    if (!TrueEdge) {
      setValueAndUpdate(connectedNodeTrueId, true);
      canceledConnection("nodeTrue");
    } else if (!FalseEdge) {
      setValueAndUpdate(connectedNodeFalseId, true);
      canceledConnection("nodeFalse");
    }
    const edges = reactFlowInstance.getEdges();

    edges.map((edge) => {
      if (edge.id === connectionTrueId) {
        edge.animated = storedResult.current ? true : false;
        edge.style = { stroke: "green" };
      }
      if (edge.id === connectionFalseId) {
        edge.animated = storedResult.current ? false : true;
        edge.style = { stroke: "red" };
      }
    });
    reactFlowInstance.setEdges(edges);
    updateNode(nodeId);
  }, [TrueEdge, FalseEdge, storedResult.current, result]);

  useEffect(() => {
    if (storedResult.current !== result) {
      setValueAndUpdate(
        storedResult.current ? connectedNodeTrueId : connectedNodeFalseId,
        true
      );
      storedResult.current = result;
    }
  }, [result]);

  useEffect(() => {
    if (nodes) {
      setValueAndUpdate(
        storedResult.current ? connectedNodeTrueId : connectedNodeFalseId
      );
    }
  }, [
    connectedNodeTrueId,
    connectedNodeFalseId,
    value,
    andOr,
    storedResult.current
  ]);

  useEffect(() => {
    setNodes(reactFlowInstance.getNodes());
    setTrueEdge(
      reactFlowInstance.getEdges().some((el) => el.id === connectionTrueId)
    );
    setFalseEdge(
      reactFlowInstance.getEdges().some((el) => el.id === connectionFalseId)
    );
  }, [store]);

  return <></>;
};
