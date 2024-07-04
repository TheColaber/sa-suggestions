import mongoose from 'mongoose';

const MODEL = 'Session';
const SessionSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true,
		default: () => crypto.randomUUID()
	},
	createdAt: {
		type: Date,
		// 7 Days
		expires: 1000 * 60 * 60 * 24 * 7,
		default: Date.now
	}
});

if (MODEL in mongoose.models) {
	mongoose.deleteModel(MODEL);
}
export const Session = mongoose.model(MODEL, SessionSchema);
