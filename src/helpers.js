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

export const haversineDistance = function(pointA, pointB) {
  var R = 6371.0710; // Radius of the Earth in miles
  var rlat1 = pointA.latitude * (Math.PI/180); // Convert degrees to radians
  var rlat2 = pointB.latitude * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (pointB.longitude - pointA.longitude) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}