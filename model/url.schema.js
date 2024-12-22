import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  customAlias: { type: String, unique: true, sparse: true },
  topic: { type: String },
  createdAt: { type: Date, default: Date.now },
});


export const Url = mongoose.model("Url", urlSchema);