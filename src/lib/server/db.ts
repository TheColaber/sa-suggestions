import { error, json, type Cookies } from '@sveltejs/kit';
import { MONGODB_USER, MONGODB_PASS } from '$env/static/private';
import mongoose from 'mongoose';
import { Session } from './schemas/session';
import { Idea } from './schemas/idea';
import { User } from './schemas/user';
import { ScratchToken } from './schemas/scratch-token';
import { put } from "@vercel/blob";
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export function connect() {
	mongoose.connect(
		`mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@sa-suggestions.jitrni9.mongodb.net/?retryWrites=true&w=majority&appName=SA-Suggestions`
	);
}

export { User, Session, Idea, ScratchToken };

export async function createUser(username: string, oauthMethod: string, imageUrl: string) {
	const existingUser = await User.findOne({ username: { $regex: new RegExp(username, 'i') } });

	if (existingUser) {
		if (existingUser.oauthMethods.includes(oauthMethod)) {
			return json({ ok: true });
		}
		return error(409, "Username already exists in a different authentication method.")
	}

	const imageBlob = await fetch(imageUrl).then(response => response.blob());	

	const ending = imageBlob.type==="image/png"? ".png" : ""
	const {url} = await put(username + ending, imageBlob, { access: "public", token: BLOB_READ_WRITE_TOKEN });	
	const newUser = new User({
		oauthMethods: [oauthMethod],
		username,
		avatar: url
	});
	
	await newUser.save();
	return json({ ok: true });
}

export async function createSession(cookies: Cookies, username: string) {
	const session = new Session({ username });
	await session.save();

	cookies.set('token', session.token, {
		path: '/'
	});
}
