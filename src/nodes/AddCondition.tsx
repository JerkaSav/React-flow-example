import React, { useEffect, useState } from "react";
import { Input, Dropdown } from "semantic-ui-react";
import { Handle, Position } from "react-flow-renderer";

type Props = {
  index: string;
  position: number;
  value: { key: string; value: string };
  getAllValuesFromNodes: (value: any) => void;
};
const options = [
  { key: 1, value: "equal", text: "equal" },
  { key: 2, value: "not equal", text: "not equal" },
  { key: 3, value: "contains", text: "contains" },
  { key: 4, value: "not contains", text: "not contains" },
  { key: 5, value: "starts with", text: "starts with" },
  { key: 6, value: "not starts with", text: "not starts with" },
  { key: 7, value: "ends with", text: "ends with" },
  { key: 8, value: "not ends with", text: "not ends with" }
];

export const AddCondition: React.FC<Props> = ({
  index,
  position,
  value,
  getAllValuesFromNodes
}) => {
  const [inputValue, setInputValue] = useState("");
  const [shouldBeDisabled, setShouldBeDisabled] = useState(false);
  const [operation, setOperation] = useState("");

  useEffect(() => {
    if (value?.value) {
      setShouldBeDisabled(true);
      setInputValue(value.value);
    } else {
      setShouldBeDisabled(false);
      setInputValue("");
    }
  }, [value?.value, value]);

  useEffect(() => {
    getAllValuesFromNodes({
      value: inputValue,
      id: index,
      operation: operation
    });
  }, [inputValue, operation]);

  return (
    <div style={{ borderBottom: "1px solid black", paddingBottom: "3px" }}>
      <Dropdown
        fluid
        placeholder="Operation"
        search
        selection
        options={options}
        scrolling={false}
        onChange={(e, { value }) => setOperation(value as string)}
      />
      <Input
        disabled={shouldBeDisabled}
        placeholder={"type"}
        value={inputValue}
        key={index}
        onChange={(e, { value }) => setInputValue(value as string)}
      />
      <Handle
        className="bigger-handle"
        style={{ top: `${position}px` }}
        id={index}
        type="target"
        position={Position.Left}
      />
    </div>
  );
};
