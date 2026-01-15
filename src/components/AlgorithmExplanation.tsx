import type { AlgorithmConfig } from "../algorithms/registry";

type Props = {
  config: AlgorithmConfig;
};

export default function AlgorithmExplanation({ config }: Props) {
  return (
    <div className="algorithm-explanation">
      <h2 className="algo-title">{config.name}</h2>

      <div className="complexity-section">
        <h3>📊 Độ phức tạp</h3>
        <div className="complexity-grid">
          <div className="complexity-item">
            <span className="label">Thời gian (tốt nhất)</span>
            <span className="value best">{config.timeComplexity.best}</span>
          </div>
          <div className="complexity-item">
            <span className="label">Thời gian (trung bình)</span>
            <span className="value average">{config.timeComplexity.average}</span>
          </div>
          <div className="complexity-item">
            <span className="label">Thời gian (tệ nhất)</span>
            <span className="value worst">{config.timeComplexity.worst}</span>
          </div>
          <div className="complexity-item">
            <span className="label">Không gian</span>
            <span className="value space">{config.spaceComplexity}</span>
          </div>
        </div>
      </div>

      <div className="description-section">
        <h3>📖 Mô tả</h3>
        <p>{config.description}</p>
      </div>

      <div className="steps-section">
        <h3>🚀 Các bước thực hiện</h3>
        <ol className="steps-list">
          {config.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="pseudocode-section">
        <h3>💻 Pseudo Code</h3>
        <pre className="pseudocode">{config.pseudoCode}</pre>
      </div>

      <div className="legend-section">
        <h3>🎨 Chú thích màu sắc</h3>
        <div className="legend-items">
          <div className="legend-item">
            <span className="color-box compare"></span>
            <span>Đang so sánh (Compare)</span>
          </div>
          <div className="legend-item">
            <span className="color-box swap"></span>
            <span>Đang hoán đổi (Swap)</span>
          </div>
          <div className="legend-item">
            <span className="color-box sorted"></span>
            <span>Đã sắp xếp (Sorted)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

