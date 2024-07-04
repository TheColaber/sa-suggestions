import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const ideasResponse = await fetch('/api/auth/scratch');
	const { token } = await ideasResponse.json();

	return {
		scratchToken: token
	};
};
