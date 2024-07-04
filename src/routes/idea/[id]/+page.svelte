<div class="idea">
  <Idea idea={data.idea} />
</div>

<script lang="ts">
	import Idea from '../../idea.svelte';
  import type { PageData } from './$types';
	
	export let data: PageData;

</script>

<style lang="scss">
  .idea {
    display: flex;
    padding: 17px;
    gap: 10px;
    width: min(800px, 100%);
  }
</style>