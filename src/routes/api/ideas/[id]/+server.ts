import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Idea } from '$lib/server/db';

export const GET: RequestHandler = async ({ locals, request, params }) => {
	const { id } = params;
	const idea = await Idea.findOne({ _id: id });
	if (!idea) return error(404, 'not found');
	const { title, author, content, upvotes } = idea;

	return json({
		id,
		title,
		author,
		content,
		upvotes: upvotes.length,
		selfUpvoted: locals.user && idea.upvotes.includes(locals.user.username)
	});
};
