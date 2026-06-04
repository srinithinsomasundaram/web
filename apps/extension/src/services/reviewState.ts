import type { ReviewResponse } from "@goaegis/shared-types";

type Listener = (review: ReviewResponse | undefined) => void;

let latestReview: ReviewResponse | undefined;
const listeners = new Set<Listener>();

export function setLatestReview(review: ReviewResponse): void {
  latestReview = review;
  for (const listener of listeners) {
    listener(latestReview);
  }
}

export function getLatestReview(): ReviewResponse | undefined {
  return latestReview;
}

export function subscribeToReviewState(listener: Listener): () => void {
  listeners.add(listener);
  listener(latestReview);
  return () => {
    listeners.delete(listener);
  };
}
