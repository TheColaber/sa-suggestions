import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch(`/api/ideas/${params.id}`);
	const idea = await res.json();

	return { idea };
};
