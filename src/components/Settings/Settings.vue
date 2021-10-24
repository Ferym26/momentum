<template lang='pug'>
	.settings
		.settings__action
			button.s-button(
				@click.prevent='isOpen = !isOpen'
				aria-label="Кнопка настроек"
			)
				img(:src="require(`@/assets/svg/settings.svg`)", alt="bg")
		.settings__menu(
			:class='{"is-open": isOpen}'
		)
			.settings__item
				.label Language
				.element
					select.select(
						v-model='lang'
						name="lang"
					)
						option(value="en") Eng
						option(value="ru") Ru

			.settings__item
				b.text Components visibility:

			.settings__item
				label.label(for='setWinamp') Winamp
				.element
					input.input#setWinamp(
						v-model='winampStatus'
						type="checkbox"
					)
			.settings__item
				label.label(for='setWeather') Weather
				.element
					input.input#setWeather(
						v-model='weatherStatus'
						type="checkbox"
					)
</template>

<script>
export default {
	name: 'Settings',
	data() {
		return {
			isOpen: true,
		}
	},
	computed: {
		winampStatus: {
			get () {
				if (localStorage.getItem('winamp')) {
					return localStorage.getItem('winamp')
				} else {
					return this.$store.state.componentVisibles.winamp
				}
			},
			set (val) {
				this.$store.commit('setComponentVisibles', { name: 'winamp', value: val });
				localStorage.setItem('winamp', val);
			}
		},
		weatherStatus: {
			get () {
				return this.$store.state.componentVisibles.weather
			},
			set (val) {
				this.$store.commit('setComponentVisibles', { name: 'weather', value: val })
			}
		},
		lang: {
			get() {
				return this.$store.state.lang
			},
			set(val) {
				this.$store.commit('setLang', val)
			},
		},
	},
	created() {
		// this.setSettings();
	},
	mounted() {
		//
	},
	methods: {
		//
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
