export const getCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by this browser.");
      return;
    }

    // Get the user's current position
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Make the reverse geocoding API request
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
          );
          const data = await response.json();

          if (data && data.localityInfo) {
            const address = data.localityInfo.administrative[0]?.name || "N/A";
            const city = data.city || "N/A";
            const state = data.localityInfo.administrative[1]?.name || "N/A";
            const zipCode = data.postcode || "N/A";

            // Return the location data
            resolve({
              latitude,
              longitude,
              address,
              city,
              state,
              zipCode,
              error: null,
            });
          } else {
            reject("Unable to retrieve address.");
          }
        } catch (error) {
          reject("Failed to fetch address from coordinates.");
        }
      },
      (error) => {
        reject(`Error fetching location: ${error.message}`);
      }
    );
  });
};
