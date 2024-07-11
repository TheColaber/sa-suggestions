import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createSession, createUser } from '$lib/server/db';
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET
} from '$env/static/private';

const GITHUB_TOKEN_ACCESS_URL = 'https://github.com/login/oauth/access_token';
const DISCORD_TOKEN_ACCESS_URL = 'https://discord.com/api/oauth2/token';

export const PUT: RequestHandler = async ({ url, cookies, locals, request }) => {
	const body = await request.text();
	if (typeof body !== 'string') return error(400, 'invalid body');
	const data = new URLSearchParams(body);
	const oauthMethod = data.get('oauth_method');
	const code = data.get('code');
	if (!(typeof code === 'string')) return error(400, 'missing code');
	if (oauthMethod === 'github') {
		const githubTokenAccessUrl = new URL(GITHUB_TOKEN_ACCESS_URL);
		githubTokenAccessUrl.searchParams.append('code', code);
		githubTokenAccessUrl.searchParams.append('client_secret', GITHUB_CLIENT_SECRET);
		githubTokenAccessUrl.searchParams.append('client_id', GITHUB_CLIENT_ID);
		githubTokenAccessUrl.searchParams.append('redirect_uri', url.origin + '/login/github');

		const response = await fetch(githubTokenAccessUrl, { method: 'POST' });
		const data = await response.text();
		const params = new URLSearchParams(data);
		const token = params.get('access_token');
		const errorType = params.get('error');
		const errorDescription = params.get('error_description');

		if (errorType && errorDescription) {
			return error(400, errorDescription);
		}
		if (token) {
			const response = await fetch('https://api.github.com/user', {
				headers: {
					Accept: 'application/vnd.github.v3+json',
					// Include the token in the Authorization header
					Authorization: 'token ' + token
				}
			});
			const user = await response.json();
			const username = user.login;
			// user.email

			const userSuccess = await createUser(username, 'github', user.avatar_url);
			if (userSuccess.ok) {
				await createSession(cookies, username);
			}
			return userSuccess;
		}

		return json(data);
	} else if (oauthMethod === 'discord') {
		const discordTokenAccessUrl = new URL(DISCORD_TOKEN_ACCESS_URL);
		const params = new URLSearchParams();
		params.append('client_id', DISCORD_CLIENT_ID);
		params.append('client_secret', DISCORD_CLIENT_SECRET);
		params.append('grant_type', 'authorization_code');
		params.append('code', code);
		params.append('redirect_uri', url.origin + '/login/discord');

		const response = await fetch(discordTokenAccessUrl, {
			method: 'POST',
			body: params,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
		const data = await response.json();
		if (data.error) {
			return error(400, data.error_description);
		}
		const token = data.access_token;

		if (token) {
			const response = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `Bearer ${token}`
				}
			});
			const user = await response.json();
			const { username } = user;
			const icon = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

			const userSuccess = await createUser(username, 'discord', icon);
			if (userSuccess.ok) {
				await createSession(cookies, username);
			}
			return userSuccess;
		}
	} else if (oauthMethod === 'scratch') {
		const response = await fetch(
			`https://api.scratch.mit.edu/studios/33639910/comments?offset=0&limit=40&timestamp=${Date.now()}`
		);
		const comments = await response.json();
		const codeComment = comments.find(({ content }: { content: string }) => content.includes(code));
		if (!codeComment) return error(400, 'could not find comment');
		const username = codeComment.author.username;
		const userSuccess = await createUser(username, 'scratch', codeComment.author.image);
		if (userSuccess.ok) {
			await createSession(cookies, username);
		}

		return userSuccess;
	}
	return json({});
};
