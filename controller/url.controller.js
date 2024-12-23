import { generateAlias } from "../utils/generateAlias.js";
import {
  isShortUrlExist,
  aliasExistance,
  saveUrl,
  getUrlLongname,
} from "../model/url.model.js";

import { client } from "../utils/RedisConnect.js";

import { saveAnalyticsDetails } from "../model/analytics.model.js";

//library
import axios from "axios";
import useragent from "useragent";
import { version } from "mongoose";

async function shortenUrl(req, res) {
  try {
    const { longUrl, customAlias, topic } = req.body;

    if (!longUrl) {
      return res.status(400).json({ message: "Please provide your url" });
    }
    let shortUrl;

    if (customAlias) {
      const existingUrl = await aliasExistance(customAlias);
      if (existingUrl) {
        return res.status(400).json({ message: "Custom alias already exists" });
      }
    } else {
      shortUrl = generateAlias();

      const findShortUrl = await isShortUrlExist(shortUrl);
      while (findShortUrl) {
        shortUrl = generateAlias();
      }
    }

    await saveUrl(longUrl, shortUrl, customAlias, topic);

    //save analytics details
    // Log analytics
    // Save analytics details
    const userAgentString = req.headers["user-agent"];
    const agent = useragent.parse(userAgentString);
    const userAgentDetails = {
      browser: agent.toAgent(),
      os: agent.os.toString(),
      device: agent.device.toString(),
      platform: agent.platform,
      source: agent.source,
      version: agent.toVersion(),
    };

    console.log("userAgentDetails", userAgentDetails);

    let ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.ip;

    // Extract the first IP address from x-forwarded-for if it contains multiple IPs
    if (ipAddress.includes(",")) {
      ipAddress = ipAddress.split(",")[0].trim();
    }

    // Extract IPv4 address if in IPv6 format
    if (ipAddress.includes("::ffff:")) {
      ipAddress = ipAddress.split("::ffff:")[1];
    }

    // Optional: Get geolocation data
    let geolocation = {};
    try {
      const geoResponse = await axios.get(
        `https://api.ipgeolocation.io/ipgeo`,
        {
          params: {
            apiKey: process.env.GEOLOCATION_API_KEY, // Your API key
            ip: ipAddress,
          },
        }
      );
      const geoData = geoResponse.data;
      geolocation = {
        country: geoData.country_name,
        region: geoData.state_prov,
        city: geoData.city,
        lat: geoData.latitude,
        lon: geoData.longitude,
      };
    } catch (geoError) {
      console.error("Geolocation API error:", geoError.message);
    }

    await saveAnalyticsDetails(
      shortUrl,
      userAgentDetails,
      ipAddress,
      geolocation,
      "generateUrl"
    );

    return res.status(201).json({ shortUrl, createdAt: Date.now() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await isShortUrlExist(shortUrl);
    if (!url) {
      return res.status(404).json({ error: "Short URL not found." });
    }
    let longUrl;

    //using redis cache
    const cachedValue = await client.get(shortUrl);
    if (cachedValue) {
      longUrl = cachedValue;
    } else {
      const Url = await getUrlLongname(shortUrl);
      longUrl = Url;
      client.set(shortUrl, longUrl);
    }

    //save analytics details
    // Log analytics
    // Save analytics details
    const userAgentString = req.headers["user-agent"];
    const agent = useragent.parse(userAgentString);
    const userAgentDetails = {
      browser: agent.toAgent(),
      os: agent.os.toString(),
      device: agent.device.toString(),
      platform: agent.platform,
      source: agent.source,
      version: agent.toVersion(),
    };

    console.log("userAgentDetails", userAgentDetails);

    let ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.ip;

    // Extract the first IP address from x-forwarded-for if it contains multiple IPs
    if (ipAddress.includes(",")) {
      ipAddress = ipAddress.split(",")[0].trim();
    }

    // Extract IPv4 address if in IPv6 format
    if (ipAddress.includes("::ffff:")) {
      ipAddress = ipAddress.split("::ffff:")[1];
    }

    // Optional: Get geolocation data
    let geolocation = {};
    try {
      const geoResponse = await axios.get(
        `https://api.ipgeolocation.io/ipgeo`,
        {
          params: {
            apiKey: process.env.GEOLOCATION_API_KEY, // Your API key
            ip: ipAddress,
          },
        }
      );
      const geoData = geoResponse.data;
      geolocation = {
        country: geoData.country_name,
        region: geoData.state_prov,
        city: geoData.city,
        lat: geoData.latitude,
        lon: geoData.longitude,
      };
    } catch (geoError) {
      console.error("Geolocation API error:", geoError.message);
    }

    await saveAnalyticsDetails(
      shortUrl,
      userAgentDetails,
      ipAddress,
      geolocation,
      "redirect"
    );

    res.redirect(longUrl);
  } catch (error) {
    console.error("Error redirecting URL:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export { shortenUrl, redirectUrl };
