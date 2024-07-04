import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const response = await fetch('/api/auth/session');
	const user = await response.json();

	const loggedIn = Boolean(user);

	return {
		loggedIn,
		user
	};
};
