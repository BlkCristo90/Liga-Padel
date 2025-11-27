// Simple ELO update function
export function eloUpdate(ratingA, ratingB, scoreA /* 1 win, 0 loss */, k=32) {
  const EA = 1 / (1 + Math.pow(10, (ratingB - ratingA)/400));
  const newA = Math.round(ratingA + k * (scoreA - EA));
  const newB = Math.round(ratingB + k * ((1 - scoreA) - (1 - EA)));
  return [newA, newB];
}
