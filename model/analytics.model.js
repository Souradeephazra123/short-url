import { Analytics } from "./analytics.schema.js";

async function saveAnalyticsDetails(alias, userAgent, ipAddress, geolocation,purpose) {
  try {
    await Analytics.create({
      alias,
      userAgent:{
        browser: userAgent.browser,
        version: userAgent.version,
        device: userAgent.device,
        os: userAgent.os,
        platform: userAgent.platform,
        source: userAgent.source,
      },
      ipAddress,
      geolocation:{
        country: geolocation.country,
        region: geolocation.region,
        city: geolocation.city,
        lat: geolocation.lat,
        lon: geolocation.lon,
      },
      purpose,
    });
  } catch (error) {
    console.error("Saving analytics in DB showing error", error);
  }
}

export { saveAnalyticsDetails };
