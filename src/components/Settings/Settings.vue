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

			.settings__item(v-for="comp in componentsVisibility" :key="comp")
				label.label(for='setWinamp') {{comp}}
				.element
					input.input#setWinamp(
						v-model="componentsVisibilityChecked"
						:value='comp'
						@change="(e) => checkBoxChangeHandler(e, comp)"
						type="checkbox"
					)
</template>

<script>
export default {
	name: 'Settings',
	data() {
		return {
			isOpen: true,
			componentsVisibility: ['Winamp', 'Weather'],
			componentsVisibilityChecked: [],

		}
	},
	computed: {
		visibility(){
			return this.$store.getters["settings/getSettings"].visibility;
		},
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
		this.updateCheckboxes();
	},
	mounted() {
		//
	},
	methods: {
		getVisibility(){
		},
		checkBoxChangeHandler(e, componentName){
			this.$store.dispatch('settings/changeField', {name: 'visibility', data: {[componentName]: e.target.checked}});
		},
		updateCheckboxes(){
			const visibility = this.visibility;
			if(!visibility){
				this.componentsVisibilityChecked = ['Winamp', 'Weather'];
			}

			let checked = [];
			this.componentsVisibility.forEach(comp => {
				if((visibility[comp] || visibility[comp])){
					checked.push(comp);
				}
			});

			this.componentsVisibilityChecked = [...checked];
		}
	},
	watch: {
		visibility: {
      handler: 'updateCheckboxes',
      deep: true,
      immediate: true
		}
	}
}
</script>

<style lang='sass' src='./style.sass'></style>
