import mongoose from 'mongoose';

const MODEL = 'User';
const UserSchema = new mongoose.Schema({
	username: {
		unique: true,
		required: true,
		type: String
	},
	oauthMethods: [String],
  createdAt: {
		type: Date,
		default: Date.now
	}
});

if (MODEL in mongoose.models) {
	mongoose.deleteModel(MODEL);
}
export const User = mongoose.model(MODEL, UserSchema);
