import type { Step } from "./types";

export function* bubbleSortSteps(arr: number[]): Generator<Step> {
  // Không mutate arr ở đây; chỉ “mô tả bước”
  const n = arr.length;

  for (let end = n - 1; end > 0; end--) {
    for (let i = 0; i < end; i++) {
      yield { type: "COMPARE", i, j: i + 1 };

      if (arr[i] > arr[i + 1]) {
        // Khi swap, nhớ swap trong bản copy nội bộ của thuật toán
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        yield { type: "SWAP", i, j: i + 1 };
      }
    }
    yield { type: "MARK_SORTED", index: end };
  }

  yield { type: "MARK_SORTED", index: 0 };
  yield { type: "DONE" };
}
