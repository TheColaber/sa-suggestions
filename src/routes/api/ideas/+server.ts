import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Idea } from '$lib/server/db';

export const PUT: RequestHandler = async ({ locals, request }) => {
  const data = await request.formData();
  const title = data.get("title");
  const content = data.get("content");
  const attachments = data.get("attachments");

  if (!locals.user) error(400, "user not logged in")
  const author = locals.user.username

  const idea = new Idea({ title, content, author });
  await idea.save();
  
  return json({ id: idea.id })
};

export const GET: RequestHandler = async ({ url }) => {
  const mode = url.searchParams.get("mode")
  const ideas = await Idea.find();
  const mapped = ideas.map(({ title, author, content, upvotes, id }) => (
    {
      title, 
      content, 
      id, 
      author,
      upvotes: upvotes.length,
    }
  ));
  if (mode === "top") {
    return json(mapped.sort((a, b) => b.upvotes - a.upvotes));
  } 
  return json(mapped);
}
