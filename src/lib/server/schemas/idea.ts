import mongoose from "mongoose";

type IdeaT = {
  title: string;
  content: string;
  author: string;
  upvotes: string[]
}

const MODEL = "Idea";
const IdeaSchema = new mongoose.Schema<IdeaT>({
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
  upvotes: {
    type: [String],
    default() { return [this.author] }
  }
});

if (MODEL in mongoose.models) {
  mongoose.deleteModel(MODEL);
}
export const Idea = mongoose.model(MODEL, IdeaSchema);
