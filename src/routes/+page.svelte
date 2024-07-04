<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import Idea from './idea.svelte';

	export let data: PageData;

	async function setMode(mode: string) {
		data.mode = mode;
		goto('?mode=' + mode);
	}
</script>

<div class="container">
	<div class="options">
		<input type="text" class="search" placeholder="Search..." />
		<div class="sort">
			<button class:selected={data.mode === 'reccomended'} on:click={() => setMode('reccomended')}
				>Reccomended</button
			>
			<button class:selected={data.mode === 'top'} on:click={() => setMode('top')}
				>Most Upvotes</button
			>
			<button class:selected={data.mode === 'new'} on:click={() => setMode('new')}>Newest</button>
		</div>
	</div>
	<div class="ideas">
		{#each data.ideas as idea}
			<div class="idea">
				<Idea {idea} />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: min(800px, 100%);
		height: fit-content;
		padding: 0px 20px 20px 20px;
		box-sizing: border-box;

		.options {
			display: flex;
			width: 100%;
			justify-content: space-between;
			gap: 10px;
			position: sticky;
			top: 0;
			background: #1e1e1e;
			z-index: 1;
			padding: 20px;

			@media only screen and (max-width: 550px) {
				& {
					flex-direction: column;

					.sort button {
						flex: 1;
					}
				}
			}

			.search {
				font-size: 24px;
				outline: none;
				background: #222;
				color: inherit;
				font-family: inherit;
				border: 2px solid #fff;
				flex: 1;
				max-width: 550px;
				min-width: 0px;
				border-radius: 6px;
				padding: 4px 10px;
			}

			.sort {
				display: flex;
				gap: 6px;
				height: 44px;

				button {
					background: #222;
					font-family: inherit;
					color: inherit;
					border: 2px solid #fff;
					border-radius: 6px;

					&.selected {
						background: #ff7b26;
					}
				}
			}
		}

		.ideas {
			display: flex;
			flex-direction: column;
			width: 100%;
			gap: 15px;

			.idea {
				width: 100%;
				display: flex;
				background: #181818;
				padding: 15px;
				border: 2px solid #fff;
				border-radius: 10px;
				gap: 10px;
				box-sizing: border-box;
			}
		}
	}
</style>
