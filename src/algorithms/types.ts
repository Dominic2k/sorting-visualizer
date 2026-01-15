export type Step =
  | { type: "COMPARE"; i: number; j: number }
  | { type: "SWAP"; i: number; j: number }
  | { type: "MARK_SORTED"; index: number }
  | { type: "DONE" };

export type Highlights = {
  comparing: [number, number] | null;
  swapping: [number, number] | null;
  sorted: Set<number>;
};
