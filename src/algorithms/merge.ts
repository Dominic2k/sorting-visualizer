import type { Step } from "./types";

export function* mergeSortSteps(arr: number[]): Generator<Step> {
  yield* mergeSortHelper(arr, 0, arr.length - 1);
  
  // Mark all as sorted at the end
  for (let i = 0; i < arr.length; i++) {
    yield { type: "MARK_SORTED", index: i };
  }
  yield { type: "DONE" };
}

function* mergeSortHelper(
  arr: number[],
  left: number,
  right: number
): Generator<Step> {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    yield* mergeSortHelper(arr, left, mid);
    yield* mergeSortHelper(arr, mid + 1, right);
    yield* merge(arr, left, mid, right);
  }
}

function* merge(
  arr: number[],
  left: number,
  mid: number,
  right: number
): Generator<Step> {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftArr.length && j < rightArr.length) {
    yield { type: "COMPARE", i: left + i, j: mid + 1 + j };

    if (leftArr[i] <= rightArr[j]) {
      if (arr[k] !== leftArr[i]) {
        arr[k] = leftArr[i];
        yield { type: "SWAP", i: k, j: left + i };
      }
      i++;
    } else {
      if (arr[k] !== rightArr[j]) {
        arr[k] = rightArr[j];
        yield { type: "SWAP", i: k, j: mid + 1 + j };
      }
      j++;
    }
    k++;
  }

  while (i < leftArr.length) {
    if (arr[k] !== leftArr[i]) {
      arr[k] = leftArr[i];
    }
    i++;
    k++;
  }

  while (j < rightArr.length) {
    if (arr[k] !== rightArr[j]) {
      arr[k] = rightArr[j];
    }
    j++;
    k++;
  }
}
