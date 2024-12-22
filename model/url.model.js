import {Url} from "./url.schema.js";

async function isShortUrlExist(shorturl) {
  try {
    const isExist = await Url.findOne({ shortUrl: shorturl });
    if (isExist) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Finding short url in DB showing error", error);
    return false;
  }
}

async function aliasExistance(alias) {
  try {
    const isExist = await Url.findOne({ customAlias: alias });
    if (isExist) {
      return true;
    }
    return false;
  } catch (err) {
    console.error("Finding alias in DB showing error", err);
    return false;
  }
}

async function saveUrl(longUrl, shortUrl, customAlias, topic) {
  try {
    await Url.create({
      longUrl,
      shortUrl,
      customAlias,
      topic,
    });
  } catch (error) {
    console.error("Saving url in DB showing error", error);
    return false;
  }
}

export { isShortUrlExist, aliasExistance,saveUrl };
