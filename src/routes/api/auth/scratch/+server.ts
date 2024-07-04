import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ScratchToken } from '$lib/server/db';

export const GET: RequestHandler = async ({ locals }) => {
	const token = new ScratchToken();
	await token.save();
	return json({ token: token.token });
};
