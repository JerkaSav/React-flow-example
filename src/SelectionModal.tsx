import React, { useState } from "react";
import { Node } from "react-flow-renderer";
import { Modal, Button } from "semantic-ui-react";
import { createNode } from "./createNode";

type props = {
  addNewNode: (node: Node) => void;
};

export const SelectionModal: React.FC<props> = ({ addNewNode }) => {
  const [open, setOpen] = useState(false);

  const onClick = (type) => {
    addNewNode(createNode(type));
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <Button
          style={{
            position: "absolute",
            zIndex: 10,
            left: "10px",
            top: "10px"
          }}
        >
          Add Node
        </Button>
      }
    >
      <Modal.Header>Select a node to add</Modal.Header>
      <Modal.Content>
        <Button
          content="text updater (just for testing)"
          onClick={() => onClick("TextUpdaterNode")}
        />
        <Button
          content="display text (just for testing)"
          onClick={() => onClick("DisplayText")}
        />
        <Button
          content="get key value"
          onClick={() => onClick("GetValueOfKey")}
        />
        <Button
          content="conditional node"
          onClick={() => onClick("ConditionalNode")}
        />
        <Button content="add template" onClick={() => onClick("AddTemplate")} />
        <Button content="Map vocab" onClick={() => onClick("MapVocab")} />
        <Button content="Add tag" onClick={() => onClick("AddTag")} />
      </Modal.Content>
    </Modal>
  );
};
