<script lang="ts">
	export let idea: any;

	let timeout = Date.now();
	let showOptions = false;

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

<div class="left">
	<img src="/api/auth/user/{idea.author}/avatar" class="icon" alt="" />
	<button class="upvote" on:click={() => toggleUpvote(idea)}>
		<img src="/upvote{idea.selfUpvoted ? '-filled' : ''}.svg" alt="" />
		<span>{idea.upvotes}</span>
	</button>
</div>
<a href="/idea/{idea.id}" class="details">
	<div class="top">
		<div class="info">
			<span class="title">{idea.title}</span>
			<span class="author">by {idea.author}</span>
		</div>
		<div class="options">
			<!-- <button on:click|preventDefault={() => showOptions = !showOptions}>
				<img src="/dots.svg" class="icon" alt="">
			</button> -->
			<!-- <div class="dropdown">
				<button class="option">Report (doesnt work)</button>
			</div> -->
		</div>
	</div>
	<span class="content">{idea.content}</span>
</a>

<style lang="scss">
	.left {
		display: flex;
		flex-direction: column;
		gap: 8px;
		.icon {
			height: 48px;
		}
		.upvote {
			padding: 0px;
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
	}

	.details {
		flex: 1;
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: #fff;
		// TODO: I hate this.
		width: 0px;
		gap: 5px;

		.top {
			display: flex;
			justify-content: space-between;

			.info {
				display: flex;
				flex-direction: column;
				overflow: hidden;

				.title {
					font-weight: bold;
					font-size: 28px;
					line-height: 22px;
				}

				.author {
					color: #ef8b4a;
				}
			}
			.options {
				display: flex;
				// button {
				// 	padding: 0px;
				// 	background: 0px;
				// 	border: none;
				// 	display: flex;
				// 	.icon {
				// 	filter: invert(1);
				// 	height: 24px;
				// }
				// }
				// 	.dropdown {
				// 		display: flex;
				// 		.option {
				// 		padding: 0px;
				// 		background: 0px;
				// 		border: none;
				// 		display: flex;
				// 		color: inherit;
				// 		font-family: inherit;
				// }
				//	}
			}
		}

		.content {
			font-weight: 350;
			max-height: 106px;
			overflow: hidden;
		}
	}
</style>
