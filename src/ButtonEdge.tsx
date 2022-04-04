import React from "react";
import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
  getSmoothStepPath,
  useReactFlow
} from "react-flow-renderer";
import "./styles.css";

const foreignObjectSize = 40;

export const ButtonEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd
}) => {
  const reactFlowInstance = useReactFlow();
  const onEdgeClick = () => {
    const edges = reactFlowInstance.getEdges();
    edges.map((el, index) => {
      if (el.id === id) {
        edges.splice(index, 1);
        reactFlowInstance.setEdges(edges);
      }
    });
  };

  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  const [edgeCenterX, edgeCenterY, offsetX, offsetY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY
  });
  let x = edgeCenterX - foreignObjectSize / 2;
  let y = edgeCenterY - foreignObjectSize / 2;
  if (targetPosition !== "top") {
    x = edgeCenterX - offsetX / 2 - foreignObjectSize / 2;
    y = edgeCenterY + offsetY / 2 - foreignObjectSize / 2;
  }
  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={x}
        y={y}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div>
          <button className="edgebutton" onClick={onEdgeClick}>
            ×
          </button>
        </div>
      </foreignObject>
    </>
  );
};
