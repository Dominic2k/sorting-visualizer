import type { Highlights, Step } from "../algorithms/types";

export function createInitialHighlights(): Highlights {
  return {
    comparing: null,
    swapping: null,
    sorted: new Set<number>(),
  };
}

export function applyStepToState(prevArr: number[], prevHL: Highlights, step: Step) {
  const nextArr = [...prevArr];
  const nextHL: Highlights = {
    comparing: null,
    swapping: null,
    sorted: new Set(prevHL.sorted),
  };

  switch (step.type) {
    case "COMPARE":
      nextHL.comparing = [step.i, step.j];
      return { arr: nextArr, hl: nextHL, done: false };

    case "SWAP": {
      nextHL.swapping = [step.i, step.j];
      const i = step.i, j = step.j;
      [nextArr[i], nextArr[j]] = [nextArr[j], nextArr[i]];
      return { arr: nextArr, hl: nextHL, done: false };
    }

    case "MARK_SORTED":
      nextHL.sorted.add(step.index);
      return { arr: nextArr, hl: nextHL, done: false };

    case "DONE":
      return { arr: nextArr, hl: nextHL, done: true };
  }
}
