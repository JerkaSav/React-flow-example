import React, { useState, useEffect, useMemo, useRef } from "react";
import { Props } from "./NodeProps";
import { Dropdown } from "semantic-ui-react";
import { Handle, Position, useReactFlow, useStore } from "react-flow-renderer";

export const AddTemplate: React.FC<Props> = ({ id, data }) => {
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [templates, setTemplates] = useState<any>(data.templates);
  const changedValue = useRef(selectedValue);

  const store = useStore();
  const reactFlowInstance = useReactFlow();
  const hasEdge = useMemo(
    () => reactFlowInstance.getEdges().some((edge) => edge.id.includes(id)),
    [store]
  );

  useEffect(() => {
    if (!hasEdge || !data.value) {
      setTemplates(data.templates);
    }
  }, [hasEdge, data.value]);

  useEffect(() => {
    const keys = Object.keys(data.templates);
    const array = [];
    keys.map((key) => array.push({ value: key, text: key, key: key }));
    setOptions(array);
  }, [data]);

  useEffect(() => {
    if (selectedValue) {
      setSelectedValue2("");
      const array = [];
      const keysofKeys = Object.keys(data.templates[selectedValue]);
      keysofKeys.map((key) => array.push({ value: key, text: key, key: key }));
      setOptions2(array);
    }
  }, [selectedValue, data]);

  useEffect(() => {
    if (data.value && selectedValue && selectedValue2) {
      setTemplates({
        ...templates,
        [selectedValue]: {
          ...templates[selectedValue],
          [selectedValue2]: data.value
        }
      });
    }
  }, [data.value, selectedValue, selectedValue2]);

  useEffect(() => {
    if (changedValue.current !== selectedValue) {
      setTemplates(data.templates);
      setSelectedValue2("");
      changedValue.current = selectedValue;
    }
  }, [selectedValue, changedValue.current]);

  return (
    <div className="basic bigger">
      <Handle
        className="bigger-handle handle-top"
        type="target"
        position={Position.Top}
      />
      <Dropdown
        placeholder="Keys"
        search
        selection
        options={options}
        scrolling={false}
        onChange={(e, { value }) => setSelectedValue(value as string)}
      />
      {selectedValue && (
        <>
          <Dropdown
            placeholder="Keys"
            search
            selection
            options={options2}
            scrolling={false}
            onChange={(e, { value }) => setSelectedValue2(value as string)}
          />
          <div>
            <p>{JSON.stringify(templates[selectedValue])}</p>
          </div>
        </>
      )}
    </div>
  );
};
