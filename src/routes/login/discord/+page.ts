import { error, redirect } from '@sveltejs/kit';
import { goto, invalidate } from '$app/navigation';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';

const OAUTH_URL = 'https://discord.com/oauth2/authorize';
const CLIENT_ID = '1257846856717832332';

export const load: PageLoad = async ({ url, fetch }) => {
	const code = url.searchParams.get('code');

	if (code) {
		const body = new URLSearchParams();
		body.append('oauth_method', 'discord');
		body.append('code', code);
		const response = await fetch('/api/auth/user', {
			method: 'PUT',
			body: body.toString()
		});
		const user = await response.json();
		if (!user.ok) {
			return error(400, 'user creation failed.');
		}
		return redirect(303, '/');
	}
	const discordOAuthURL = new URL(OAUTH_URL);
	discordOAuthURL.searchParams.append('client_id', CLIENT_ID);
	discordOAuthURL.searchParams.append('response_type', 'code');
	discordOAuthURL.searchParams.append('redirect_uri', url.origin + url.pathname);
	discordOAuthURL.searchParams.append('scope', 'identify');
	if (browser) {
		window.location.href = discordOAuthURL.toString();
	} else {
		redirect(303, discordOAuthURL);
	}
};
