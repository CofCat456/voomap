export function createRandomCoordinate() {
  const randomLat = 24 + Math.random();
  const randomLng = 121 + Math.random();

  const lat = Number.parseFloat(randomLat.toFixed(6));
  const lng = Number.parseFloat(randomLng.toFixed(6));

  return { lat, lng };
}
