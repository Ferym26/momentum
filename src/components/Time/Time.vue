<template lang='pug'>
	.time.component(
		:class='{"is-visible": isVisible}'
	)
		.time__clocks {{ clocks }}
		.time__date {{ calendar }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'Time',
	data() {
		return {
			date: new Date(),
			clocks: null,
			calendar: null,
			intervel: null,
		}
	},
	computed: {
		...mapGetters({
			settings: 'settings/getSettings',
			lang: 'getLang',
		}),
		calendarLocale() {
			return this.lang === 'en' ? 'en-US' : 'ru-Ru'
		},
		isVisible() {
			return this.settings?.visibility.Time ?? true
		},
	},
	mounted() {
		this.setTime();
		this.DayPeriod();
	},
	methods: {
		...mapActions({
			DayPeriod: 'DayPeriod',
		}),
		setTime() {
			const _this = this;
			const optionsClock = {
				hour12: false,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			};
			const optionsCalendar = {
				hour12: false,
				weekday: 'long',
				month: 'long',
				day: '2-digit',
			};
			this.interval = setInterval(() => {
				this.clocks = new Intl.DateTimeFormat('ru-Ru', optionsClock).format(new Date());
				this.calendar = new Intl.DateTimeFormat(_this.calendarLocale, optionsCalendar).format(new Date());
				// this.DayPeriod();
			}, 1000);
		},
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
