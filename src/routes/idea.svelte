<button class="upvote" on:click={() => toggleUpvote(idea)}>
  <img src="/upvote{upvotes[idea.id] ? "-filled" : ""}.svg" alt="" />
  <span>{idea.upvotes}</span>
</button>
<a href="/idea/{idea.id}" class="details">
  <div class="info">
    <span class="title">{idea.title}</span>
    <span class="author">by {idea.author}</span>
  </div>
  <span class="content">{idea.content}</span>
</a>

<script lang="ts">
	export let idea: any;
	export let upvotes: any;  

  async function toggleUpvote(idea: any) {
    const response = await fetch("/api/ideas/" + idea.id + "/upvote", {
      method: "POST",
      body: JSON.stringify(!upvotes[idea.id])
    });
    const newValue = await response.json();
    upvotes[idea.id] = newValue;

    if (newValue)
    idea.upvotes += 1
  else idea.upvotes -= 1
  }
</script>

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
			display: flex;
			flex-direction: column;
			text-decoration: none;
			color: #fff;

			.info {
				.title {
					font-weight: bold;
					font-size: 28px;
				}

				.author {
					color: #ef8b4a;
				}
			}

			.content {
				font-weight: 350;
			}
		}
</style>
