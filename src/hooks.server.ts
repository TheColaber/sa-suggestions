import { Session, User } from '$lib/server/db';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	event.locals.token = token;
	if (token) {
		const session = await Session.findOne({ token });
		if (session) {
			const user = await User.findOne({ username: session.username });
			if (user) {
				const { username, oauthMethods } = user;
				event.locals.user = { username, oauthMethods };
			}
		}
	}
	const response = await resolve(event);
	return response;
};
