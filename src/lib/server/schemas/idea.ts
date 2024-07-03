import mongoose from "mongoose";

const MODEL = "Idea";
const IdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  upvotes: [String]
});

if (MODEL in mongoose.models) {
  mongoose.deleteModel(MODEL);
}
export const Idea = mongoose.model(MODEL, IdeaSchema);
