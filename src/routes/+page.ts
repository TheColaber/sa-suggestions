import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	let mode = url.searchParams.get('mode') || 'reccomended';

	const ideasResponse = await fetch('/api/ideas?mode=' + mode);
	const ideas = await ideasResponse.json();

	return {
		ideas,
		mode
	};
};
