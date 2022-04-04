import React, { useState } from "react";
import { Handle, Position } from "react-flow-renderer";
import "./style.css";
import { StringStateHandle } from "./handlers/StringStateHandle";
type Props = {
  id?: string;
  data?: { value: string | number };
  type?: string;
  xPos?: number;
  yPos?: number;
  zIndex?: number;
  selected?: boolean;
  sourcePosition?: string;
  targetPosition?: string;
  dragging?: boolean;
  isConnectable?: boolean;
  dragHandle?: string;
};
export const TextUpdaterNode: React.FC<Props> = ({
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
  const [connectedNodeId, setConnectedNodeId] = useState<string>("");
  const [targetHandleId, setTargetHandleId] = useState<string>("");
  const [value, setValue] = useState("");

  const onChange = (evt) => {
    setValue(evt.target.value);
  };

  const onConnect = ({ target, targetHandle }) => {
    setTargetHandleId(targetHandle);
    setConnectedNodeId(target);
  };

  const canceledConnection = () => setConnectedNodeId("");

  return (
    <div className="basic">
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} onConnect={onConnect} />
      <StringStateHandle
        connectedNodeId={connectedNodeId}
        targetHandleId={targetHandleId}
        nodeId={id}
        value={value}
        canceledConnection={canceledConnection}
      />
    </div>
  );
};
