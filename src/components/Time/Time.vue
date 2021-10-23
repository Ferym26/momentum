<template lang='pug'>
	.time
		.time__clocks {{ clocks }}
		.time__date {{ calendar }}
</template>

<script>
import { mapActions } from 'vuex'
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
	mounted() {
		this.setTime();
	},
	methods: {
		...mapActions({
			DayPeriod: 'DayPeriod',
		}),
		setTime() {
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
				this.clocks = new Intl.DateTimeFormat('en-En', optionsClock).format(new Date());
				this.calendar = new Intl.DateTimeFormat('en-En', optionsCalendar).format(new Date());
				this.DayPeriod();
			}, 1000);
		},
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
