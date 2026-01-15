import type { Step } from "./types";

export function* selectionSortSteps(arr: number[]): Generator<Step> {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      yield { type: "COMPARE", i: minIdx, j };

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      yield { type: "SWAP", i, j: minIdx };
    }

    yield { type: "MARK_SORTED", index: i };
  }

  yield { type: "MARK_SORTED", index: n - 1 };
  yield { type: "DONE" };
}
