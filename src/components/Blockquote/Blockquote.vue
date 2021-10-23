<template lang='pug'>
	.blockquote
		.blockquote__action
			button.blockquote__reload(
				@click.prevent='getRandomQuote()'
			)
				img(:src="require(`@/assets/svg/reload.svg`)", alt="bg")
		.blockquote__content
			.blockquote__title {{ quote.text }}
			.blockquote__name {{ quote.author }}
</template>

<script>
import blockquotes from "@/assets/data/blockquotes.js"
export default {
	name: 'Blockquote',
	data() {
		return {
			quote: {},
		}
	},
	mounted() {
		this.getRandomQuote();
	},
	methods: {
		random() {
			return Math.round(Math.random() * (20 - 1) + 1);
		},
		getRandomQuote() {
			this.quote = blockquotes[this.random()];
		}
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
