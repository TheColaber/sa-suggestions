import mongoose from 'mongoose';

const MODEL = 'ScratchToken';
const ScratchTokenSchema = new mongoose.Schema({
	token: {
		type: String,
		required: true,
		default: () => crypto.randomUUID()
	},
	createdAt: {
		type: Date,
		// 3 Minutes
		expires: 1000 * 60 * 3,
		default: Date.now
	}
});

if (MODEL in mongoose.models) {
	mongoose.deleteModel(MODEL);
}
export const ScratchToken = mongoose.model(MODEL, ScratchTokenSchema);
