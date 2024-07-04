import mongoose from 'mongoose';

const MODEL = 'ScratchToken';
const ScratchTokenSchema = new mongoose.Schema({
	token: {
		type: String,
		required: true,
		default: () => crypto.randomUUID()
	}
});

if (MODEL in mongoose.models) {
	mongoose.deleteModel(MODEL);
}
export const ScratchToken = mongoose.model(MODEL, ScratchTokenSchema);
