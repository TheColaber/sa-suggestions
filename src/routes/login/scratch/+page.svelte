<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import type { PageData } from './$types';

	let loading = false;
	export let data: PageData;

	async function loginWithToken() {
		const body = new URLSearchParams();
		body.append('oauth_method', 'scratch');
		body.append('code', data.scratchToken);
		loading = true;
		const response = await fetch('/api/auth/user', {
			method: 'PUT',
			body: body.toString()
		});
		const user = await response.json();
		if (user.ok) {
			invalidate('/api/auth/session');
			goto('/');
		} else {
			loading = false;
		}
	}
</script>

{#if loading}
	Loading...
{:else}
	Copy this code: "{data.scratchToken}" and comment it on
	<a href="https://scratch.mit.edu/studios/33639910/comments" target="_blank"> this studio </a>
	<button on:click={loginWithToken}>Done</button>
{/if}
