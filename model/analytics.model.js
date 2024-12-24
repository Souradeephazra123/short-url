import { Analytics } from "./analytics.schema.js";

async function saveAnalyticsDetails(
  alias,
  userAgent,
  ipAddress,
  geolocation,
  purpose
) {
  try {
    await Analytics.create({
      alias,
      userAgent: {
        browser: userAgent.browser,
        version: userAgent.version,
        device: userAgent.device,
        os: userAgent.os,
        platform: userAgent.platform,
        source: userAgent.source,
      },
      ipAddress,
      geolocation: {
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

async function getTotalClicks() {
  try {
    const numberOfClicks = await Analytics.find({
      purpose: "generateUrl",
    }).countDocuments();
    return numberOfClicks;
  } catch (error) {
    console.log("Error finding total clicks", error);
  }
}

async function countOfClickByDate(numberOfDay = 7) {
  try {
    //count documents within the range
    const startDate = new Date();
    const endDate = new Date(
      new Date().setDate(new Date().getDate() - numberOfDay)
    );
    const resultCountWithinRange = await Analytics.countDocuments({
      timestamp: {
        $gte: endDate,
        $lt: startDate,
      },
    });
    return resultCountWithinRange;
  } catch (error) {
    console.log("Error finding total clicks withing range", error);
  }
}
export { saveAnalyticsDetails };
