import React, { useEffect, useState } from "react";
import { useReactFlow, Handle, Position } from "react-flow-renderer";
import "./style.css";

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

export const DisplayText: React.FC<Props> = ({
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
  const [value, setValue] = useState<any>();

  useEffect(() => {
    setValue(data?.value);
  }, [data]);

  return (
    <div className="basic">
      <Handle type="target" position={Position.Top} />
      <div>{value}</div>
    </div>
  );
};
