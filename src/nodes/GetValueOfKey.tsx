import React, { useState, useEffect } from "react";
import { Props } from "./NodeProps";
import { Dropdown, DropdownItemProps } from "semantic-ui-react";
import { Handle, Position } from "react-flow-renderer";
import { StringStateHandle } from "./handlers/StringStateHandle";
import { StringStateHandleV2 } from "./handlers/StringStateHandleV2";

export const GetValueOfKey: React.FC<Props> = ({
  id,
  data,
  type,
  xPos,
  yPos,
  zIndex,
  selected,
  sourcePosition,
  targetPosition,
  dragging,
  isConnectable,
  dragHandle
}) => {
  const [options, setOptions] = useState<DropdownItemProps[]>([]);
  const [connectedNodeId, setConnectedNodeId] = useState<string>("");
  const [targetHandleId, setTargetHandleId] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState("");

  const onConnect = ({ target, targetHandle }) => {
    setTargetHandleId(targetHandle);
    setConnectedNodeId(target);
  };

  const canceledConnection = () => {
    setTargetHandleId("");
    setConnectedNodeId("");
  };

  useEffect(() => {
    const keys = Object.keys(data.object);
    let values = [];
    keys.map((el) => {
      values.push({ key: el, text: el, value: el });
    });
    setOptions(values);
  }, [data]);

  return (
    <div className="basic bigger">
      <div className="dropdown-get-value">
        <Dropdown
          placeholder="Keys"
          search
          selection
          options={options}
          scrolling={false}
          onChange={(e, { value }) => setSelectedValue(value as string)}
        />
      </div>
      <Handle
        className="bigger-handle handle-bottom"
        type="source"
        position={Position.Bottom}
        onConnect={onConnect}
        isValidConnection={({ target }) =>
          target.includes("con") || target.includes("mapVocab")
        }
      />
      <StringStateHandleV2
        targetHandleId={targetHandleId}
        connectedNodeId={connectedNodeId}
        nodeId={id}
        value={selectedValue}
        canceledConnection={canceledConnection}
      />
    </div>
  );
};
