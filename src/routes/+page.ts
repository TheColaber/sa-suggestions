import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	let mode = url.searchParams.get("mode") || "reccomended";

  const ideasResponse = await fetch("/api/ideas?mode=" + mode);
  const ideas = await ideasResponse.json();
  const upvotes: { [id: string]: boolean } = {};

	for (const idea of ideas) {
	  const response = await fetch("/api/ideas/" + idea.id + "/upvote");
		const upvote = await response.json();
		upvotes[idea.id] = upvote;
	}
	
	return {
		ideas,
		upvotes,
		mode
	};
};