<template lang='pug'>
	.bg-slider
		.bg-slider__bg
			.bg-slider__bg-pic(
				v-if='dayPeriod'
				:style='bgURL'
			)
		.bg-slider__nav
			button.bg-slider__btn.bg-slider__btn--prev(
				@click='prevSlide()'
				aria-label='prev slide'
			)
				img(:src="require(`@/assets/svg/slider-prev.svg`)", alt="bg")
			button.bg-slider__btn.bg-slider__btn--next(
				@click='nextSlide()'
				aria-label='next slide'
			)
				img(:src="require(`@/assets/svg/slider-next.svg`)", alt="bg")
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'BgSlider',
	data() {
		return {
			number: null,
		}
	},
	created() {
		this.number = this.random();
	},
	computed: {
		...mapGetters({
			dayPeriod: 'getDayPeriod',
		}),
		bgURL() {
			const periods = ['night', 'morning', 'evening', 'night'];
			const baseURL = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
			const formatedNum = (value) => {
				if (value > 0 && value < 10) {
					return `0${value}`
				} else {
					return value
				}
			}
			const url = `${baseURL}${periods[this.dayPeriod]}/${formatedNum(this.number)}.jpg`;
			return {
				backgroundImage: `url(${url})`,
			}
		},
	},
	methods: {
		prevSlide() {
			if (this.number > 1) {
				this.number -= 1
			} else {
				this.number = 20
			}
		},
		nextSlide() {
			if (this.number < 20) {
				this.number += 1
			} else {
				this.number = 1
			}
		},
		random() {
			return Math.round(Math.random() * (20 - 1) + 1);
		},
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
