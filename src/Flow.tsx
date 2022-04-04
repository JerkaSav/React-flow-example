import React, { useState } from "react";
import ReactFlow, { useReactFlow, MiniMap } from "react-flow-renderer";
import { DisplayText } from "./nodes/DisplayText";
import { TextUpdaterNode } from "./nodes/TextUpdaterNode";
import { SelectionModal } from "./SelectionModal";
import { GetValueOfKey } from "./nodes/GetValueOfKey";
import { ConditionalNode } from "./nodes/ConditionalNode";
import { AddTemplate } from "./nodes/AddTemplate";
import { MapVocab } from "./nodes/MapVocab";
import { AddTag } from "./nodes/AddTag";
import { ButtonEdge } from "./ButtonEdge";

const rfStyle = {
  backgroundColor: "#B8CEFF"
};
const edgeOptions = {
  type: "buttonedge",
  animated: true
};
const edgeTypes = {
  buttonedge: ButtonEdge
};
const nodeTypes = {
  DisplayText: DisplayText,
  TextUpdaterNode: TextUpdaterNode,
  GetValueOfKey: GetValueOfKey,
  ConditionalNode: ConditionalNode,
  AddTemplate: AddTemplate,
  MapVocab: MapVocab,
  AddTag: AddTag
};

export const Flow = () => {
  const reactFlowInstance = useReactFlow();

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const addNewNode = (node) => {
    reactFlowInstance.addNodes(node);
    setNodes(reactFlowInstance.getNodes());
    setEdges(reactFlowInstance.getEdges());
  };

  return (
    <ReactFlow
      className="validationflow"
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={edgeOptions}
      defaultNodes={nodes}
      defaultEdges={edges}
      style={rfStyle}
    >
      <MiniMap />
      <SelectionModal addNewNode={addNewNode} />
    </ReactFlow>
  );
};
