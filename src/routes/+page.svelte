<script lang="ts">
	import type { PageData } from './$types';
	import Idea from './idea.svelte';

	export let data: PageData;  
</script>

{#each data.ideas as idea}
	<div class="idea">
    <Idea idea={idea} upvotes={data.upvotes} />
	</div>
{/each}

<style lang="scss">
	.idea {
		display: flex;
		background: #181818;
		width: min(800px, 100%);
		padding: 15px;
		border: 2px solid #fff;
		border-radius: 10px;
		gap: 10px;
	}
</style>
