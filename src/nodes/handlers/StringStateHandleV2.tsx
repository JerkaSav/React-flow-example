import React, { useState, useEffect } from "react";
import {
  useReactFlow,
  useStore,
  Node,
  useUpdateNodeInternals
} from "react-flow-renderer";

type Props = {
  connectedNodeId: string;
  targetHandleId: string;
  nodeId: string;
  value: string;
  canceledConnection: () => void;
};

export const StringStateHandleV2: React.FC<Props> = ({
  connectedNodeId,
  targetHandleId,
  nodeId,
  value,
  canceledConnection
}) => {
  const store = useStore();
  const reactFlowInstance = useReactFlow();
  const [edge, setEdge] = useState(false);
  const [nodes, setNodes] = useState<Node[]>();
  const connectionId = `reactflow__edge-${nodeId}-${connectedNodeId}`;
  const [data, setData] = useState("");
  const [conditionalValues, setConditionalValues] = useState({
    key: "",
    value: ""
  });
  const updateNode = useUpdateNodeInternals();
  const updateConditonalValuesArray = (node, value) => {
    if (node.data.conditonalValuesArray.length < 1) {
      node.data.conditonalValuesArray = [value];
    } else {
      node.data.conditonalValuesArray.map(({ key }, index) => {
        if (key === value.key) {
          node.data.conditonalValuesArray[index].value = value.value;
        } else {
          node.data.conditonalValuesArray.push(value);
        }
      });
    }
  };

  useEffect(() => {
    if (targetHandleId === "main") {
      setData(value);
    }

    if (targetHandleId && targetHandleId !== "main") {
      setConditionalValues({ key: targetHandleId, value: value });
    }
  }, [value, edge, targetHandleId, connectedNodeId]);

  useEffect(() => {
    if (!edge) {
      const node = reactFlowInstance.getNode(connectedNodeId);
      if (node) {
        if (targetHandleId !== "main") {
          updateConditonalValuesArray(node, {
            key: conditionalValues.key,
            value: ""
          });
        } else {
          node.data.value = "";
        }
        updateNode(connectedNodeId);
      }
      canceledConnection();
    }
  }, [edge]);

  useEffect(() => {
    const node = reactFlowInstance.getNode(connectedNodeId);
    if (connectedNodeId) {
      if (targetHandleId !== "main") {
        updateConditonalValuesArray(node, conditionalValues);
      } else {
        node.data.value = data;
      }
      reactFlowInstance.setNodes([...nodes, node]);
      updateNode(connectedNodeId);
    }
  }, [connectedNodeId, data, conditionalValues]);

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
