import type { Highlights } from "../algorithms/types";

type Props = {
  array: number[];
  highlights: Highlights;
};

function isInPair(idx: number, pair: [number, number] | null) {
  return pair ? (idx === pair[0] || idx === pair[1]) : false;
}

export default function Bars({ array, highlights }: Props) {
  const max = Math.max(...array, 1);
  const barCount = array.length;
  
  const barWidth = Math.max(2, Math.min(12, Math.floor(600 / barCount)));

  return (
    <div className="bars-container">
      {array.map((v, idx) => {
        let bg = "var(--color-bar-default, #999)";

        if (highlights.sorted.has(idx)) bg = "var(--color-sorted)";
        else if (isInPair(idx, highlights.swapping)) bg = "var(--color-swap)";
        else if (isInPair(idx, highlights.comparing)) bg = "var(--color-compare)";

        const h = Math.round((v / max) * 280);

        return (
          <div
            key={idx}
            title={`${v}`}
            className="bar"
            style={{
              width: barWidth,
              height: h,
              background: bg,
              flexShrink: 0,
            }}
          />
        );
      })}
    </div>
  );
}

