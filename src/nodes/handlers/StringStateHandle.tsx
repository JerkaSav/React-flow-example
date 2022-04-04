import React, { useState, useEffect } from "react";
import { useReactFlow, useStore, Node } from "react-flow-renderer";

type Props = {
  connectedNodeId: string;
  targetHandleId: string;
  nodeId: string;
  value: string;
  canceledConnection: () => void;
};

export const StringStateHandle: React.FC<Props> = ({
  connectedNodeId,
  targetHandleId,
  nodeId,
  value,
  canceledConnection
}) => {
  const store = useStore();
  const reactFlowInstance = useReactFlow();
  const [connectedNode, setConnectedNode] = useState<Node | undefined>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [nodes, setNodes] = useState<Node[]>();
  const [edge, setEdge] = useState<boolean>();
  const connectionId = `reactflow__edge-${nodeId}-${connectedNodeId}`;

  useEffect(() => {
    if (connectedNode && targetHandleId === "main") {
      setConnectedNode({
        ...connectedNode,
        data: {
          ...connectedNode.data,
          value: value
        }
      });
    }
    if (connectedNode && targetHandleId && targetHandleId !== "main") {
      connectedNode.data.conditonalValuesArray.map((el, index) => {
        if (el.key === targetHandleId) {
          connectedNode.data.conditonalValuesArray.splice(index, 1);
        }
      });

      setConnectedNode({
        ...connectedNode,
        data: {
          ...connectedNode.data,
          conditonalValuesArray: [
            ...connectedNode.data.conditonalValuesArray,
            { key: targetHandleId, value: value }
          ]
        }
      });
    }
  }, [value, isConnected, edge, targetHandleId]);

  useEffect(() => {
    if (nodes) {
      nodes.map((el, index) => {
        if (el.id === connectedNodeId) {
          setConnectedNode(nodes.splice(index, 1)[0]);
        }
      });
    }
  }, [connectedNodeId]);

  useEffect(() => {
    if (!edge) {
      setIsConnected(false);
      setConnectedNode(undefined);
      canceledConnection();
    } else setIsConnected(true);
  }, [edge]);

  useEffect(() => {
    if (nodes && connectedNode) {
      const positionNode = connectedNode;
      const { data } = reactFlowInstance.getNode(connectedNodeId);
      console.log(data);
      nodes.map((el) => {
        if (el.id === connectedNodeId) {
          positionNode.position = {
            x: el.position.x,
            y: el.position.y
          };
          if (targetHandleId !== "main") {
            positionNode.data.value = data.value;
            const fixedArray = data.conditonalValuesArray;
            if (fixedArray[0]) {
              console.log("fixedarray", fixedArray);
              positionNode.data.conditonalValuesArray.map(
                ({ value, key }, index) => {
                  if (key === fixedArray[index]?.key) {
                    fixedArray[index].value = value;
                  } else {
                    fixedArray.push({ value: value, key: key });
                  }
                }
              );
              positionNode.data.conditonalValuesArray = fixedArray;
            }
          } else {
            positionNode.data.conditonalValuesArray =
              data.conditonalValuesArray;
          }
        }
      });
      reactFlowInstance.setNodes([...nodes, positionNode]);
    }
  }, [connectedNode]);

  useEffect(() => {
    setNodes(reactFlowInstance.getNodes());

    setEdge(
      reactFlowInstance
        .getEdges()
        .some(
          (el) => el.id === connectionId || el.targetHandle === targetHandleId
        )
    );
  }, [store]);

  return <></>;
};
