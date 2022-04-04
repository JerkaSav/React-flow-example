import React, { useEffect, useState } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  useStore,
  useUpdateNodeInternals
} from "react-flow-renderer";
import { Button, Checkbox } from "semantic-ui-react";
import { Props } from "./NodeProps";
import { evaluateOperations } from "./handlers/evaluateOperations";
import { BooleanStateHandleV2 } from "./handlers/BooleanStateHandleV2";
import { AddCondition } from "./AddCondition";

export const ConditionalNode: React.FC<Props> = ({ data, id }) => {
  const store = useStore();
  const reactflowInstance = useReactFlow();
  const updateNode = useUpdateNodeInternals();
  const [ids, setIds] = useState([0]);
  const [allValuesFromNodes, setAllValuesFromNodes] = useState([]);
  const [andOr, setAndOr] = useState(false);
  const [evaluated, setEvaluated] = useState(false);
  const [connectedNodeTrueId, setConnectedNodeTrueId] = useState("");
  const [connectedNodeFalseId, setConnectedNodeFalseId] = useState("");
  let position = 218;

  useEffect(() => {
    reactflowInstance.getEdge(id);
  }, [store]);

  const removeCondition = () => {
    if (ids.length > 1) {
      setAllValuesFromNodes(allValuesFromNodes.splice(ids[0], 1));
      setIds(ids.splice(0, 1));
    }
  };

  const onConnect = ({ target, sourceHandle }) => {
    if (sourceHandle === "true") setConnectedNodeTrueId(target);
    else setConnectedNodeFalseId(target);
  };

  const canceledConnection = (nodeToDisconnect) => {
    if (nodeToDisconnect === "nodeFalse") setConnectedNodeFalseId("");
    if (nodeToDisconnect === "nodeTrue") setConnectedNodeTrueId("");
  };

  const getAllValuesFromNodes = (value) => {
    allValuesFromNodes.map((el, index) => {
      if (el.id === value.id) {
        allValuesFromNodes.splice(index, 1);
      }
    });
    setAllValuesFromNodes([...allValuesFromNodes, value]);
  };

  useEffect(() => {
    if (data.value)
      setEvaluated(evaluateOperations(allValuesFromNodes, data.value, andOr));
  }, [allValuesFromNodes, andOr, data.value]);

  return (
    <div className={`basic bigger ${evaluated ? "green" : "red"}`}>
      <Handle
        className="bigger-handle handle-top"
        id="main"
        type="target"
        position={Position.Top}
      />
      <h3>{data.value || "value"}</h3>
      <Checkbox label="AND/OR" toggle onClick={() => setAndOr(!andOr)} />
      <Button.Group>
        <Button
          content="add"
          onClick={() => {
            setIds([...ids, ids[ids.length - 1] + 1]);
            updateNode(id);
          }}
        />
        <Button content="remove" onClick={removeCondition} />
      </Button.Group>
      {ids.map((el, index) => {
        let value;
        if (index > 0) {
          position = position + 88;
        }
        data.conditonalValuesArray.map((els) => {
          if (els.key === `${el}-${id}`) {
            value = els;
          }
        });

        return (
          <AddCondition
            index={`${el}-${id}`}
            position={position}
            key={index}
            value={value}
            getAllValuesFromNodes={getAllValuesFromNodes}
          />
        );
      })}
      <Handle
        className="bigger-handle"
        id="true"
        type="source"
        position={Position.Bottom}
        onConnect={onConnect}
        style={{ left: "50px", background: "green" }}
        isValidConnection={({ target }) => target.includes("addTemplate")}
      />
      <Handle
        className="bigger-handle"
        id="false"
        type="source"
        position={Position.Bottom}
        onConnect={onConnect}
        style={{
          left: "200px",
          background: "red"
        }}
      />
      <BooleanStateHandleV2
        nodeId={id}
        connectedNodeTrueId={connectedNodeTrueId}
        connectedNodeFalseId={connectedNodeFalseId}
        result={evaluated}
        value={data.value}
        canceledConnection={canceledConnection}
        andOr={andOr}
      />
    </div>
  );
};
