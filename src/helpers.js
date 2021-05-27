export const getRandomInt = function(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const secsToMillisecs = function(secs) {
  const oneSecondInMilliseconds = 1000;
  let millisecs = secs * oneSecondInMilliseconds;
  return millisecs;
};

export const minsToMillisecs = function(mins) {
  const oneMinuteInMilliseconds = 60000;
  let millisecs = mins * oneMinuteInMilliseconds;
  return millisecs;
};