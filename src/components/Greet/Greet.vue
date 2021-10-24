<template lang='pug'>
	.greet.component(
		:class='{"is-visible": isVisible}'
	)
		.greet__title {{ setTitle() + ',' }}
		.greet__form
			.greet__name {{ name }}
			input.greet__input(
				v-model='name'
				@input="setNameToLS()"
				type="text"
				:placeholder="lang === 'en' ? '[Enter name]' : '[Введите имя]'"
			)
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Greet',
	data() {
		return {
			timer: null,
			name: '',
		}
	},
	mounted() {
		this.getNameFromLS();
	},
	computed: {
		...mapGetters({
			dayPeriod: 'getDayPeriod',
			lang: 'getLang',
			settings: 'settings/getSettings',
		}),
		isVisible() {
			return this.settings?.visibility.Greet ?? true
		},
	},
	methods: {
		getNameFromLS() {
			if(localStorage.getItem('name')) {
				this.name = localStorage.getItem('name');
			}
		},
		setNameToLS() {
			if (this.timer) {
				window.clearTimeout(this.timer);
			}
			this.timer = window.setTimeout(() => {
				localStorage.setItem('name', this.name);
			}, 500);
		},
		setTitle() {
			if (this.dayPeriod === 0) {
				return this.lang === 'en' ? 'Good night' : 'Спокойной ночи'
			}
			if (this.dayPeriod === 1) {
				return this.lang === 'en' ? 'Good morning' : 'Доброе утро'
			}
			if (this.dayPeriod === 2) {
				return this.lang === 'en' ? 'Good afternoon' : 'Добрый день'
			}
			if (this.dayPeriod === 3) {
				return this.lang === 'en' ? 'Good evening' : 'Добрый вечер'
			}
		},
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
