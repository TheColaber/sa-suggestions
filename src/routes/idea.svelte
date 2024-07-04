<script lang="ts">
	export let idea: any;

	let timeout = Date.now();

	async function toggleUpvote(idea: any) {
		if (Date.now() - timeout < 100) return;
		timeout = Date.now();
		const newValue = !idea.selfUpvoted;
		fetch('/api/ideas/' + idea.id + '/upvote', {
			method: 'POST',
			body: JSON.stringify(newValue)
		});
		idea.selfUpvoted = newValue;
		if (newValue) idea.upvotes += 1;
		else idea.upvotes -= 1;
	}
</script>

<button class="upvote" on:click={() => toggleUpvote(idea)}>
	<img src="/upvote{idea.selfUpvoted ? '-filled' : ''}.svg" alt="" />
	<span>{idea.upvotes}</span>
</button>
<a href="/idea/{idea.id}" class="details">
	<div class="info">
		<span class="title">{idea.title}</span>
		<span class="author">by {idea.author}</span>
	</div>
	<span class="content">{idea.content}</span>
</a>

<style lang="scss">
	.upvote {
		padding: 8px 0px;
		background: none;
		border: none;
		display: flex;
		height: fit-content;
		flex-direction: column;
		align-items: center;
		color: inherit;
		font-family: inherit;
		font-size: 18px;
		img {
			filter: invert(1);
		}
	}

	.details {
		flex: 1;
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: #fff;
		// TODO: I hate this.
		width: 0px;

		.info {
			.title {
				font-weight: bold;
				font-size: 28px;
				text-overflow: ellipsis;
				display: block;
				overflow: hidden;
			}

			.author {
				color: #ef8b4a;
			}
		}

		.content {
			font-weight: 350;
			max-height: 106px;
			overflow: hidden;
		}
	}
</style>
