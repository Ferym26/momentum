<template lang='pug'>
	.greet
		.greet__title Доброе утро,
		.greet__form
			input.greet__input(
				v-model='name'
				@input="setNameToLS()"
				type="text"
				placeholder="[Введите имя]"
			)
</template>

<script>
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
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
