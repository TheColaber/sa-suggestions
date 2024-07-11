import type { LayoutLoad } from './$types';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

inject();
injectSpeedInsights();
export const load: LayoutLoad = async ({ fetch }) => {
	const response = await fetch('/api/auth/session');
	const user = await response.json();

	const loggedIn = Boolean(user);

	return {
		loggedIn,
		user
	};
};
