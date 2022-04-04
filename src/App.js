import "./styles.css";
import "semantic-ui-css/semantic.min.css";

import { ReactFlowProvider } from "react-flow-renderer";
import { Flow } from "./Flow";

export default function App() {
  return (
    <div
      className="App"
      style={{ width: "1000px", height: "700px", border: "1px solid black" }}
    >
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}
