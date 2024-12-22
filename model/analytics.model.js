import { Analytics } from "./analytics.schema.js";

async function saveAnalyticsDetails(alias, userAgent, ipAddress, geolocation) {
  try {
    await Analytics.create({
      alias,
      userAgent,
      ipAddress,
      geolocation:{
        country: geolocation.country,
        region: geolocation.region,
        city: geolocation.city,
        lat: geolocation.lat,
        lon: geolocation.lon,
      },
    });
  } catch (error) {
    console.error("Saving analytics in DB showing error", error);
  }
}

export { saveAnalyticsDetails };
