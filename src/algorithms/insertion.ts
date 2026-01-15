import type { Step } from "./types";

export function* insertionSortSteps(arr: number[]): Generator<Step> {
  const n = arr.length;

  yield { type: "MARK_SORTED", index: 0 };

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0) {
      yield { type: "COMPARE", i: j, j: j + 1 };

      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        yield { type: "SWAP", i: j, j: j + 1 };
        j--;
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    yield { type: "MARK_SORTED", index: i };
  }

  yield { type: "DONE" };
}
