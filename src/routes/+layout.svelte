<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	let showProfileDropdown = false;

	function toggleProfileDropdown() {
		showProfileDropdown = !showProfileDropdown;
	}
</script>

<div class="main">
	<div class="header">
		<img src="/sa.svg" alt="" class="icon" />
		<span class="title">Scratch Addons - Addon Ideas</span>
	</div>
	{#if data.loggedIn}
		<div class="navbar">
			<a href="/idea/create">Create Idea</a>
			<a href="/">Explore Ideas</a>
			<div class="dropdown-container">
				<button on:click|preventDefault={toggleProfileDropdown}>
					<img class="icon" src="/api/auth/user/{data.user.username}/avatar" alt="" />
					{data.user.username}
				</button>
				<div class="dropdown" class:show={showProfileDropdown}>
					<a href="/my-ideas">My Ideas</a>
					<a href="/settings">Settings</a>
					<a href="/logout" data-sveltekit-preload-data="false">Logout</a>
				</div>
			</div>
		</div>
		<div class="content">
			<slot />
		</div>
	{:else if $page.url.pathname === '/login/scratch'}
		<slot />
	{:else}
		<div class="login-options" data-sveltekit-preload-data="false">
			<a href="/login/github" class="github">
				<img src="/github.svg" alt="" />
				<span>Login with Github</span>
			</a>
			<a href="/login/discord" class="discord">
				<img src="/discord.svg" alt="" />
				<span>Login With Discord</span>
			</a>
			<a href="/login/scratch" class="scratch">
				<img src="/scratch.svg" alt="" />
				<span>Login with Scratch</span>
			</a>
		</div>
	{/if}
</div>

<svelte:head>
	<title>Addon Ideas | Scratch Addons</title>
</svelte:head>

<style lang="scss">
	.main {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #1e1e1e;
		color: #fff;

		.content {
			box-sizing: border-box;
			display: flex;
			width: 100%;
			justify-content: center;
			overflow-y: auto;
		}

		.header {
			display: flex;
			justify-content: center;
			padding: 10px 20px;
			background-color: #ff7b26;
			color: #fff;
			align-items: center;
			width: 100%;
			box-sizing: border-box;

			.title {
				font-size: 32px;
				font-weight: 500;
			}

			.icon {
				height: 50px;
			}
		}

		.navbar {
			display: flex;
			justify-content: center;
			background-color: #ff7b26;
			width: 100%;
			gap: 15px;

			a,
			.dropdown-container {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 40px;
			}

			a,
			button {
				color: #fff;
				text-decoration: none;
				font-size: 18px;
				font-weight: 400;
				transition: all 0.2s;
				border-radius: 5px 5px 0px 0px;
				background: none;
				font-family: inherit;
				border: none;
				padding: 0px 10px;

				&:hover {
					background-color: #00000022;
				}
			}

			.dropdown-container {
				display: flex;
				flex-direction: column;
				align-items: center;

				button {
					display: flex;
					align-items: center;
					gap: 6px;
					height: 100%;
					width: 100%;
					justify-content: center;

					.icon {
						height: 36px;
					}
				}

				.dropdown {
					display: none;
					position: fixed;
					transform: translateY(66%);
					background-color: #ff7b26;
					z-index: 2;

					&.show {
						display: flex;
						flex-direction: column;
						align-items: center;
					}
				}
			}
		}

		.login-options {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 4px;
			align-items: center;
			flex: 1;

			a {
				display: flex;
				align-items: center;
				gap: 8px;
				width: 250px;
				padding: 20px 14px;
				font-size: 20px;
				font-weight: 600;
				text-decoration: none;
				border-radius: 4px;

				span {
					display: flex;
					flex: 1;
					justify-content: center;
				}

				img {
					width: 35px;
					height: 28px;
					object-fit: contain;
				}

				&:first-child {
					border-radius: 10px 10px 4px 4px;
				}

				&:last-child {
					border-radius: 4px 4px 10px 10px;
				}

				&.github {
					background-color: #24292e;
					color: #fff;
				}

				&.discord {
					background-color: #7289da;
					color: #fff;
				}

				&.scratch {
					background-color: #f6ab3c;
					color: #000;
				}
			}
		}
	}
</style>
