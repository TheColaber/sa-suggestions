<form method="POST" class="form">
	<input type="text" name="title" id="title" class="title" placeholder="Title your idea" />
	<textarea name="content" id="content" class="content-area"></textarea>
	<div class="actions">
		<input
			type="file"
			id="attachments"
			name="attachments"
			class="attach-input"
			accept="image/*"
			multiple
		/>
		<label for="attachments" class="attach">Attach</label>
		<button class="create">Create</button>
	</div>
</form>

<style lang="scss">
	.form {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #fff;
		width: min(100%, 600px);
		gap: 15px;

		.title {
			width: 100%;
			border: #fff 3px solid;
			background: #181818;
			box-sizing: border-box;
			font-size: 24px;
			font-family: inherit;
			color: inherit;
			outline: none;
			padding: 5px 10px;
			border-radius: 6px;
		}

		.content-area {
			box-sizing: border-box;
			border: #fff 3px solid;
			background: #181818;
			border-radius: 6px;
			resize: none;
			height: 300px;
			width: 100%;
			outline: none;
			padding: 10px;
			font-size: 18px;
			font-family: inherit;
			color: inherit;
		}

		.actions {
			display: flex;
			justify-content: space-between;
			width: 100%;

			.attach-input {
				display: none;
			}

			label,
			button {
				border: #fff 3px solid;
				background: #181818;
				border-radius: 6px;
				color: inherit;
				font-size: 20px;
				font-family: inherit;
				padding: 8px 24px;
			}
		}
	}
</style>
