import { Node } from "react-flow-renderer";
import { initialData, template } from "./data";
function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const createNode = (type: string): Node => {
  switch (type) {
    case "DisplayText":
      return {
        id: uuidv4(),
        type: type,
        data: { value: 123 },
        position: { x: 100, y: 300 }
      };
    case "TextUpdaterNode":
      return {
        id: uuidv4(),
        type: type,
        data: { value: 321 },
        position: { x: 100, y: 200 }
      };
    case "GetValueOfKey":
      return {
        id: `valueOfKey-${uuidv4()}`,
        type: type,
        data: { object: initialData },
        position: { x: 100, y: 200 }
      };
    case "ConditionalNode":
      return {
        id: `con-${uuidv4()}`,
        type: type,
        data: { value: "", conditonalValuesArray: [] },
        position: { x: 100, y: 200 }
      };
    case "AddTemplate":
      return {
        id: `addTemplate-${uuidv4()}`,
        type: type,
        data: { value: "", templates: template },
        position: { x: 100, y: 200 }
      };
    case "MapVocab":
      return {
        id: `mapVocab-${uuidv4()}`,
        type: type,
        data: { value: "", vocabId: 0 },
        position: { x: 100, y: 200 }
      };
    case "AddTag":
      return {
        id: `addTag-${uuidv4()}`,
        type: type,
        data: { value: "", vocabId: 0 },
        position: { x: 100, y: 200 }
      };
    default:
      console.error("module " + type + " not found");
  }
};
