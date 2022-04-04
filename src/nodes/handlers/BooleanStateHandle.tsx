import React, { useState, useEffect } from "react";
import { useReactFlow, useStore, Node } from "react-flow-renderer";

type Props = {
  connectedNodeFalseId: string;
  connectedNodeTrueId: string;
  nodeId: string;
  value: string;
  result: boolean;
  canceledConnection: (nodeToDisconnect: string) => void;
  andOr: boolean;
};

export const BooleanStateHandle: React.FC<Props> = ({
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
  const [connectedNodeFalse, setConnectedNodeFalse] = useState<
    Node | undefined
  >();
  const [connectedNodeTrue, setConnectedNodeTrue] = useState<
    Node | undefined
  >();

  const [nodes, setNodes] = useState<Node[]>();
  const [edge, setEdge] = useState<{ falseEdge: boolean; trueEdge: boolean }>();
  const [resultOperations, setResultOperations] = useState<{
    result: boolean;
    value: string;
  }>();
  const connectionFalseId = `reactflow__edge-${nodeId}false-${connectedNodeFalseId}`;
  const connectionTrueId = `reactflow__edge-${nodeId}true-${connectedNodeTrueId}`;

  useEffect(() => {
    if (connectedNodeTrue && resultOperations.result) {
      setConnectedNodeTrue({
        ...connectedNodeTrue,
        data: {
          ...connectedNodeTrue.data,
          value: resultOperations.value
        }
      });
    }
    if (connectedNodeFalse && !resultOperations.result) {
      setConnectedNodeFalse({
        ...connectedNodeFalse,
        data: {
          ...connectedNodeFalse.data,
          value: resultOperations.value
        }
      });
    }
  }, [resultOperations]);

  useEffect(() => {
    setResultOperations({ result: result, value: value });
  }, [result, value, andOr]);

  useEffect(() => {
    if (nodes && connectedNodeTrue) {
      const positionNode = connectedNodeTrue;
      nodes.map((el) => {
        if (el.id === connectedNodeTrueId) {
          positionNode.position = {
            x: el.position.x,
            y: el.position.y
          };
        }
      });
      reactFlowInstance.setNodes([...nodes, positionNode]);
    }
  }, [connectedNodeTrue]);

  useEffect(() => {
    if (nodes && connectedNodeFalse) {
      const positionNode = connectedNodeFalse;
      nodes.map((el) => {
        if (el.id === connectedNodeFalseId) {
          positionNode.position = {
            x: el.position.x,
            y: el.position.y
          };
        }
      });
      reactFlowInstance.setNodes([...nodes, positionNode]);
    }
  }, [connectedNodeFalse]);

  useEffect(() => {
    if (nodes) {
      nodes.map((el, index) => {
        if (el.id === connectedNodeTrueId) {
          setConnectedNodeTrue(nodes.splice(index, 1)[0]);
        }
      });
    }
  }, [connectedNodeTrueId]);

  useEffect(() => {
    if (nodes) {
      nodes.map((el, index) => {
        if (el.id === connectedNodeFalseId) {
          setConnectedNodeFalse(nodes.splice(index, 1)[0]);
        }
      });
    }
  }, [connectedNodeFalseId]);

  useEffect(() => {
    setNodes(reactFlowInstance.getNodes());
    setEdge({
      falseEdge: reactFlowInstance
        .getEdges()
        .some((el) => el.id === connectionFalseId),
      trueEdge: reactFlowInstance
        .getEdges()
        .some((el) => el.id === connectionTrueId)
    });
  }, [store]);

  useEffect(() => {
    if (edge) {
      if (!edge.falseEdge) {
        setConnectedNodeFalse(undefined);
        canceledConnection("nodeFalse");
      }
      if (!edge.trueEdge) {
        setConnectedNodeTrue(undefined);
        canceledConnection("nodeTrue");
      }
    }
  }, [edge?.falseEdge, edge?.trueEdge]);

  return <></>;
};
