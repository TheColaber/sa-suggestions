import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Idea } from '$lib/server/db';

export const PUT: RequestHandler = async ({ locals, request }) => {
	const data = await request.formData();
	const title = data.get('title');
	const content = data.get('content');
	const attachments = data.get('attachments');

	if (!locals.user) return error(400, 'user not logged in');

	if (String(title).length > 100) {
		return error(400, 'title too long. max 100 characters');
	}
	if (String(title).length > 1000) {
		return error(400, 'title too long. max 1000 characters');
	}
	const author = locals.user.username;

	const idea = new Idea({ title, content, author });
	await idea.save();

	return json({ id: idea.id });
};

export const GET: RequestHandler = async ({ url, locals }) => {
	const mode = url.searchParams.get('mode');
	let ideas = await Idea.find();

	if (mode === 'top') {
		ideas = ideas.sort((a, b) => b.upvotes.length - a.upvotes.length)
	} else if (mode === 'new') {
		ideas = ideas.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
	} else if (mode === 'reccomended') {
		ideas = ideas.sort(() => 0.5 - Math.random())
		ideas = ideas.sort(() => 0.5 - Math.random())
		ideas = ideas.sort(() => 0.5 - Math.random())
	}

	// TODO: Merge with GET `/idea/[id]`
	const mapped = ideas.map(({ title, author, content, upvotes, id, createdAt }) => ({
		title,
		content,
		id,
		author,
		upvotes: upvotes.length,
		selfUpvoted: locals.user && upvotes.includes(locals.user.username),
		createdAt
	}));

	return json(mapped);
};
