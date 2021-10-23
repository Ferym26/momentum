<template lang='pug'>
	.greet
		.greet__title {{ setTitle() + ',' }}
		.greet__form
			.greet__name {{ name }}
			input.greet__input(
				v-model='name'
				@input="setNameToLS()"
				type="text"
				placeholder="[Enter name]"
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
		}),
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
				return 'Good night'
			}
			if (this.dayPeriod === 1) {
				return 'Good morning'
			}
			if (this.dayPeriod === 2) {
				return 'Good afternoon'
			}
			if (this.dayPeriod === 3) {
				return 'Good evening'
			}
			// с 6:00 до 11:59 - Good morning / Доброе утро / Добрай раніцы
			// с 12:00 до 17:59 - Good afternoon / Добрый день / Добры дзень
			// с 18:00 до 23:59 - Good evening / Добрый вечер / Добры вечар
			// с 00:00 до 5:59 - Good night / Доброй/Спокойной ночи / Дабранач
		},
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
