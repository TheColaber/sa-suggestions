import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Idea } from '$lib/server/db';

export const GET: RequestHandler = async ({ locals, request, params }) => {
  const { id } = params;
  const idea = await Idea.findOne({ _id: id });
  if (!idea) return error(404, "not found")
    if (!locals.user) return error(400, "not logged in")
  return json(idea.upvotes.includes(locals.user.username))
};

export const POST: RequestHandler = async ({ locals, request, params }) => {
  const { id } = params;
  if (!locals.user) return error(400, "not logged in")
  const {username} = locals.user;
  const value = await request.json();
  const idea = await Idea.findOne({ _id: id });
  if (!idea) return error(404, "not exist")
  if (value === true) {
    idea.upvotes.push(username)
  } else {
    idea.upvotes.splice(idea.upvotes.indexOf(username), 1)
  }
  await idea.save();
  return json(idea.upvotes.includes(locals.user.username))
};
