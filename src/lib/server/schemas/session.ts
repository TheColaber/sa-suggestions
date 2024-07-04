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
	}
});

if (MODEL in mongoose.models) {
	mongoose.deleteModel(MODEL);
}
export const Session = mongoose.model(MODEL, SessionSchema);
