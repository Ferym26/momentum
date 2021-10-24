<template lang='pug'>
	.weather(
		v-if='settings.visibility.Weather'
	)
		.weather__city
			input.weather__input(
				v-model='city'
				@input="sendRequest()"
				type="text"
			)
		.weather__body(
			v-if='isLoaded && !isError'
		)
			.weather__icon
				.owf.owf-3x(
					:class='`owf-${icon}`'
				)
			.weather__t
				.weather__t-num {{ temp }}°C
				.weather__t-text {{ description }}
			.weather__wind {{ lang === 'en' ? 'Wind speed' : 'Скорость ветра' }}: {{ wind }} {{ lang === 'en' ? 'm/s' : 'м/с' }}
			.weather__humidity {{ lang === 'en' ? 'Humidity' : 'Влажность' }}: {{ humidity }}%
		.weather__preloader(
			v-if='!isLoaded'
		) {{ lang === 'en' ? 'Loading' : 'Загрузка' }}
		.weather__error(
			v-if='isError'
		) {{ lang === 'en' ? 'Error' : 'Ошибка' }}
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Weather',
	data() {
		return {
			isLoaded: false,
			isError: false,
			timer: null,
			city: 'Минск',
			// lang: 'ru',
			icon: null,
			temp: '',
			description: '',
			wind: '',
			humidity: null,
		}
	},
	mounted() {
		this.getWeather();
		this.getCityFromLS();
	},
	computed: {
		...mapGetters({
			lang: 'getLang',
			settings: 'settings/getSettings',
		}),
	},
	watch: {
		lang() {
			this.getWeather();
		},
	},
	methods: {
		getWeather() {
			this.isLoaded = false;
			this.isError = false;
			const requestStr = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&lang=${this.lang}&appid=${process.env.VUE_APP_WEATHER_KEY}&units=metric`;
			this.axios({
				method: 'get',
				url: requestStr,
			})
				.then(({ data }) => {
					// console.log(data);
					this.isError = false;
					this.icon = data.weather[0].id;
					this.temp = data.main.temp;
					this.description = data.weather[0].description;
					this.wind = data.wind.speed;
					this.humidity = data.main.humidity;
					this.isLoaded = true;
				})
				.catch(({ res }) => {
					console.error('getWeather', res);
					this.isError = true;
					this.isLoaded = true;
				})
		},
		sendRequest() {
			if (this.timer) {
				window.clearTimeout(this.timer);
			}
			this.timer = window.setTimeout(() => {
				this.getWeather();
				this.saveCityToLS();
			}, 500);
		},
		saveCityToLS() {
			localStorage.setItem('city', this.city);
		},
		getCityFromLS() {
			if(localStorage.getItem('city')) {
				this.city = localStorage.getItem('city');
			}
		},
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
