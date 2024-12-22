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
    type: String,
  },
  ipAddress: { type: String },
  geolocation: {
    country: { type: String },
    region: { type: String },
    city: { type: String },
    lat: { type: Number },
    lon: { type: Number },
  },
});

export const Analytics = mongoose.model("analytics", analyticsSchema);
