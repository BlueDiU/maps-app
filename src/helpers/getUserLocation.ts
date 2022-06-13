/**
 * It returns a promise that resolves to an array of two numbers, the first being the longitude and the
 * second being the latitude
 * @returns A promise that resolves to an array of two numbers.
 */
export const getUserLocation = async (): Promise<
  [number, number]
> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude]);
      },
      (err) => {
        alert('No se pudo obtener la geolocatización');
        console.log(err);

        reject();
      }
    );
  });
};
