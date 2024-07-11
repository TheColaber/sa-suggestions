import { error, json, } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { head } from "@vercel/blob";
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { User } from '$lib/server/db';

export const GET: RequestHandler = async ({ url, cookies, locals, request, params }) => {  
  const user = await User.findOne({ username: params.user })  
  if (!user || !user.avatar) return json({});
  const imageBlob = await fetch(user.avatar).then(response => response.blob());	  
  return new Response(imageBlob)
};
