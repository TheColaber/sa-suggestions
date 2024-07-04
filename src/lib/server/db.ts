import type { Cookies } from '@sveltejs/kit';
import { MONGODB_USER, MONGODB_PASS } from '$env/static/private';
import mongoose from 'mongoose';
import { Session } from './schemas/session';
import { Idea } from './schemas/idea';
import { User } from './schemas/user';
import { ScratchToken } from './schemas/scratch-token';

export function connect() {
	mongoose.connect(
		`mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@sa-suggestions.jitrni9.mongodb.net/?retryWrites=true&w=majority&appName=SA-Suggestions`
	);
}

export { User, Session, Idea, ScratchToken };

export async function createUser(username: string, oauthMethod: string) {
	const existingUser = await User.findOne({ username: { $regex: new RegExp(username, 'i') } });

	if (existingUser) {
		if (existingUser.oauthMethods.includes(oauthMethod)) {
			return true;
		}
		return false;
	}
	const newUser = new User({
		oauthMethods: [oauthMethod],
		username
	});
	await newUser.save();
	return true;
}

export async function createSession(cookies: Cookies, username: string) {
	const session = new Session({ username });
	await session.save();

	cookies.set('token', session.token, {
		path: '/'
	});
}
