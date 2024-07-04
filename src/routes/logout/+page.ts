import { error, redirect } from '@sveltejs/kit';
import { goto, invalidate } from '$app/navigation';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/auth/session', {
		method: 'DELETE'
	});
	const success = await response.json();

	if (success.ok) {
		if (browser) {
			invalidate('/api/auth/session');
			goto('/');
		} else {
			redirect(303, '/');
		}
	} else {
		error(400, 'Could not log out.');
	}
};
