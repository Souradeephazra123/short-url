import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  alias: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userAgent: {
    browser: { type: String },
    version: { type: String },
    os: { type: String },
    platform: { type: String },
    source: { type: String },
    device: { type: String },
  },
  ipAddress: { type: String },
  geolocation: {
    country: { type: String },
    region: { type: String },
    city: { type: String },
    lat: { type: Number },
    lon: { type: Number },
  },
  purpose: {
    type: String,
  },
  userId: {
    type: String,
  },
});

export const Analytics = mongoose.model("analytics", analyticsSchema);
