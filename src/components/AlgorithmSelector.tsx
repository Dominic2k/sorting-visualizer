import { algorithms } from "../algorithms/registry";

type Props = {
  selectedId: string;
  onSelect: (id: string) => void;
  disabled?: boolean;
};

export default function AlgorithmSelector({ selectedId, onSelect, disabled }: Props) {
  return (
    <div className="algorithm-selector">
      <label className="selector-label">Chọn thuật toán:</label>
      <div className="algorithm-cards">
        {algorithms.map((algo) => (
          <button
            key={algo.id}
            className={`algorithm-card ${selectedId === algo.id ? "active" : ""}`}
            onClick={() => onSelect(algo.id)}
            disabled={disabled}
          >
            <span className="algo-name">{algo.name}</span>
            <span className="algo-complexity">{algo.timeComplexity.average}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
