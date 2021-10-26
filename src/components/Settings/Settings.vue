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
				.label {{ lang === 'en' ? 'Language' : 'Язык' }}
				.element
					select.select(
						v-model='lang'
						name="lang"
					)
						option(value="en") Eng
						option(value="ru") Ru

			.settings__item
				b.text {{ lang === 'en' ? 'Components visibility' : 'Видимость компонентов' }}:

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
			isOpen: false,
			componentsVisibility: ['Winamp', 'Weather', 'Time', 'Greet', 'Blockquote'],
			componentsVisibilityChecked: [],
		}
	},
	computed: {
		visibility(){
			return this.$store.getters["settings/getSettings"].visibility;
		},
		lang: {
			get() {
				return this.$store.getters.getLang
			},
			set(val) {
				// this.$store.dispatch('settings/changeField', {name: 'language', data: val});
				this.$store.commit('setLang', val);
			},
		},
	},
	created() {
		this.updateCheckboxes();
		if(localStorage.getItem('Lang')) {
			this.lang = localStorage.getItem('Lang')
		}
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
				this.componentsVisibilityChecked = ['Winamp', 'Weather', 'Time', 'Greet', 'Blockquote'];
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
			immediate: true,
		}
	}
}
</script>

<style lang='sass' src='./style.sass'></style>
