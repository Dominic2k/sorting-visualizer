import type { Step } from "./types";

export function* quickSortSteps(arr: number[]): Generator<Step> {
  yield* quickSortHelper(arr, 0, arr.length - 1);
  
  // Mark all as sorted at the end
  for (let i = 0; i < arr.length; i++) {
    yield { type: "MARK_SORTED", index: i };
  }
  yield { type: "DONE" };
}

function* quickSortHelper(
  arr: number[],
  low: number,
  high: number
): Generator<Step> {
  if (low < high) {
    const pivotIndex = yield* partition(arr, low, high);
    yield* quickSortHelper(arr, low, pivotIndex - 1);
    yield* quickSortHelper(arr, pivotIndex + 1, high);
  }
}

function* partition(
  arr: number[],
  low: number,
  high: number
): Generator<Step, number> {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    yield { type: "COMPARE", i: j, j: high };

    if (arr[j] <= pivot) {
      i++;
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield { type: "SWAP", i, j };
      }
    }
  }

  if (i + 1 !== high) {
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    yield { type: "SWAP", i: i + 1, j: high };
  }

  return i + 1;
}
