import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Session } from '$lib/server/db';

export const GET: RequestHandler = ({ locals }) => {
	if (locals.user) {
		return json(locals.user);
	} else {
		return json(false);
	}
};

export const DELETE: RequestHandler = async ({ cookies, locals }) => {
	await Session.findOneAndDelete({ token: locals.token });
	cookies.delete('token', { path: '/' });

	return json({ ok: true });
};
