type Props = {
  running: boolean;
  speedMs: number;
  size: number;
  onGenerate: () => void;
  onStart: () => void;
  onPause: () => void;
  onStep: () => void;
  onSpeedChange: (v: number) => void;
  onSizeChange: (v: number) => void;
};

export default function Controls({
  running,
  speedMs,
  size,
  onGenerate,
  onStart,
  onPause,
  onStep,
  onSpeedChange,
  onSizeChange,
}: Props) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      <button onClick={onGenerate} disabled={running}>Generate</button>
      {!running ? <button onClick={onStart}>Start</button> : <button onClick={onPause}>Pause</button>}
      <button onClick={onStep} disabled={running}>Step</button>

      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        Speed(ms):
        <input
          type="range"
          min={10}
          max={500}
          step={10}
          value={speedMs}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          disabled={running}
        />
        <span>{speedMs}</span>
      </label>

      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        Size:
        <input
          type="range"
          min={10}
          max={120}
          step={5}
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          disabled={running}
        />
        <span>{size}</span>
      </label>
    </div>
  );
}
