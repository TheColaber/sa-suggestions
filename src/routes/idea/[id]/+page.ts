import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch(`/api/ideas/${params.id}`);
	const idea = await res.json();

  const response = await fetch("/api/ideas/" + idea.id + "/upvote");
  const upvote = await response.json();
	return { idea, upvote };
};