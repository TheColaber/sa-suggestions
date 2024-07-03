import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ locals }) => {
	if (locals.user) {
		return json(locals.user);
	} else {
		return json(false);
	}
};

export const DELETE: RequestHandler = ({ cookies }) => {
  cookies.delete("token", {path: "/"})  

	return json({ ok: true })
};