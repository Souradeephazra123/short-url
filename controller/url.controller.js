import { generateAlias } from "../utils/generateAlias.js";
import {
  isShortUrlExist,
  aliasExistance,
  saveUrl,
} from "../model/url.model.js";

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

    res.redirect(url.longUrl);
  } catch (error) {
    console.error("Error redirecting URL:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};



export { shortenUrl,redirectUrl };