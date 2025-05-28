import { useRef } from "react";
import { useScrollSync } from "@n0nb3br/react-use-scroll-sync";
import "./App.css";

function App() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLTextAreaElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);

  useScrollSync([ref1, ref2, ref3, ref4]);
  // Example with options (proportional scrolling disabled for ref1 and ref2)
  // useScrollSync([ref1, ref2], { proportional: false });
  // useScrollSync([ref3, ref4], { horizontal: false }); // only vertical for ref3, ref4

  const longContent = (paneName: string, items: number, itemHeight?: string) =>
    [...Array(items)].map((_, i) => (
      <div key={i} style={{ height: itemHeight }}>
        Item {i + 1} in {paneName}
      </div>
    ));

  const textAreaContent = (lines: number) =>
    [...Array(lines)].map((_, i) => `Line ${i + 1} in Textarea\n`).join("");

  return (
    <div className="container">
      <h1>@n0nb3br/react-use-scroll-sync Example</h1>
      <div className="scroll-grid">
        <div className="scroll-pane-container">
          <h2>Pane 1 (Default)</h2>
          <div ref={ref1} className="scroll-pane">
            {longContent("Pane 1", 50)}
          </div>
        </div>

        <div className="scroll-pane-container">
          <h2>Pane 2 (Taller Items)</h2>
          <div ref={ref2} className="scroll-pane">
            {longContent("Pane 2", 30, "40px")}
          </div>
        </div>

        <div className="scroll-pane-container">
          <h2>Pane 3 (Textarea)</h2>
          <textarea ref={ref3} className="scroll-pane textarea-pane">
            {textAreaContent(100)}
          </textarea>
        </div>

        <div className="scroll-pane-container">
          <h2>Pane 4 (Wider Content)</h2>
          <div ref={ref4} className="scroll-pane">
            <div style={{ width: "600px", background: "lightyellow" }}>
              {longContent("Pane 4 (Wide)", 20)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
