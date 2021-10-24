<template lang='pug'>
	.blockquote(
		v-if='settings.visibility.Blockquote'
	)
		.blockquote__action
			button.blockquote__reload(
				@click.prevent='getRandomQuote()'
			)
				img(:src="require(`@/assets/svg/reload.svg`)", alt="bg")
		.blockquote__content
			.blockquote__title {{ quote[lang].text }}
			.blockquote__name {{ quote[lang].author }}
</template>

<script>
import { mapGetters } from 'vuex'
import blockquotes from "@/assets/data/blockquotes.js"
export default {
	name: 'Blockquote',
	data() {
		return {
			quote: {
				ru: {},
				en: {},
			},
		}
	},
	computed: {
		...mapGetters({
			settings: 'settings/getSettings',
		}),
		...mapGetters('settings', {
			lang: 'getLang'
		})
	},
	mounted() {
		this.getRandomQuote();
	},
	methods: {
		random() {
			return Math.round(Math.random() * 19);
		},
		getRandomQuote() {
			this.quote = blockquotes[this.random()];
		}
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
