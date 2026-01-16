import { useEffect, useRef, useState } from "react";
import Bars from "./components/Bars";
import Controls from "./components/Controls";
import AlgorithmSelector from "./components/AlgorithmSelector";
import AlgorithmExplanation from "./components/AlgorithmExplanation";
import { UserMenu } from "./components/UserMenu";
import { AuthModal } from "./components/AuthModal";
import { algorithms, getAlgorithmById } from "./algorithms/registry";
import type { Step } from "./algorithms/types";
import { applyStepToState, createInitialHighlights } from "./runner/applyStep";

function randomArray(size: number) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

export default function App() {
  const [selectedAlgoId, setSelectedAlgoId] = useState(algorithms[0].id);
  const [size, setSize] = useState(30);
  const [array, setArray] = useState(() => randomArray(30));
  const [highlights, setHighlights] = useState(() => createInitialHighlights());
  const [speedMs, setSpeedMs] = useState(80);
  const [running, setRunning] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const genRef = useRef<Generator<Step> | null>(null);
  const doneRef = useRef(false);

  // Lấy config của thuật toán đang chọn
  const currentAlgo = getAlgorithmById(selectedAlgoId) ?? algorithms[0];

  const resetGenerator = () => {
    genRef.current = currentAlgo.generator([...array]);
    doneRef.current = false;
  };

  // Reset khi đổi thuật toán hoặc size
  useEffect(() => {
    setHighlights(createInitialHighlights());
    setRunning(false);
    genRef.current = null;
    doneRef.current = false;
  }, [selectedAlgoId, array.length]);

  const onGenerate = () => {
    const arr = randomArray(size);
    setArray(arr);
    setHighlights(createInitialHighlights());
    setRunning(false);
    genRef.current = null;
    doneRef.current = false;
  };

  const runOneStep = () => {
    if (!genRef.current) resetGenerator();
    const g = genRef.current!;
    const { value, done } = g.next();

    if (done || !value) return;

    const result = applyStepToState(array, highlights, value);
    setArray(result.arr);
    setHighlights(result.hl);

    if (result.done) {
      doneRef.current = true;
      setRunning(false);
    }
  };

  // Timer loop khi running
  useEffect(() => {
    if (!running) return;

    const id = window.setInterval(() => {
      if (doneRef.current) return;
      runOneStep();
    }, speedMs);

    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, speedMs, array, highlights]);

  const onStart = () => {
    if (!genRef.current) resetGenerator();
    setRunning(true);
  };

  const onPause = () => setRunning(false);

  const onStep = () => runOneStep();

  const onSizeChange = (v: number) => {
    setSize(v);
    setArray(randomArray(v));
    setHighlights(createInitialHighlights());
    setRunning(false);
    genRef.current = null;
    doneRef.current = false;
  };

  const onAlgorithmChange = (id: string) => {
    setSelectedAlgoId(id);
    // Reset với mảng mới
    const arr = randomArray(size);
    setArray(arr);
    setHighlights(createInitialHighlights());
    setRunning(false);
    genRef.current = null;
    doneRef.current = false;
  };

  return (
    <div className="app-container">
      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <h1>🎓 Sorting Visualizer</h1>
          <p>Học thuật toán sắp xếp qua trực quan hóa</p>
        </div>
        <div className="header-right">
          <UserMenu onOpenAuth={() => setShowAuthModal(true)} />
        </div>
      </header>

      {/* Algorithm Selector */}
      <AlgorithmSelector
        selectedId={selectedAlgoId}
        onSelect={onAlgorithmChange}
        disabled={running}
      />

      {/* Main Content - Split Screen */}
      <main className="main-content">
        {/* Left Panel - Visualization */}
        <section className="visualization-panel">
          <div className="panel-header">
            <h2>⚡ {currentAlgo.name}</h2>
          </div>

          <Controls
            running={running}
            speedMs={speedMs}
            size={size}
            onGenerate={onGenerate}
            onStart={onStart}
            onPause={onPause}
            onStep={onStep}
            onSpeedChange={setSpeedMs}
            onSizeChange={onSizeChange}
          />

          <Bars array={array} highlights={highlights} />
        </section>

        {/* Right Panel - Explanation */}
        <aside className="explanation-panel">
          <AlgorithmExplanation config={currentAlgo} />
        </aside>
      </main>
    </div>
  );
}

