import { Session, User, connect } from '$lib/server/db';
import { actionLimiter, GETLimiter } from '$lib/server/limiter';
import type { Handle } from '@sveltejs/kit';

connect();

export const handle: Handle = async ({ event, resolve }) => {
	// const limiter = event.request.method === "GET" ? GETLimiter : actionLimiter;
	// const status = await limiter.check(event);
	
	// if (status.limited) {		
  //   let response = new Response(
  //     `You are being rate limited. Please try after ${status.retryAfter} seconds.`,
  //     {
  //       status: 429,
  //       headers: { 'Retry-After': status.retryAfter.toString() }
  //     }
  //   );
  //   return response;
  // }
	
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
