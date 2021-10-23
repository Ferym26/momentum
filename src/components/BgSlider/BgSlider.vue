<template lang='pug'>
	.bg-slider
		.bg-slider__bg
			.bg-slider__bg-pic(
				v-if='dayPeriod + 1'
				:style='backgroundImageStyle'
				:class='{"blur": imageLoading}'
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
			imageMin: 1,
			imageMax: 20,
			imageLoading: true,
			imageSrc: ''
		}
	},
	created() {
		this.number = this.random(this.imageMin, this.imageMax);
		this.$store.dispatch('DayPeriod')
			.then(() => {
				this.imageSrc = this.bgURL;
				this.imageLoading = false;
			})
	},
	computed: {
		...mapGetters({
			dayPeriod: 'getDayPeriod',
		}),
		getBaseWithDayPeriod(){
			const periods = ['night', 'morning', 'evening', 'night'];
			const baseURL = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
			return `${baseURL}${periods[this.dayPeriod]}/`;
		},
		bgURL() {
			const url = `${this.getBaseWithDayPeriod}${this.TwoDigNum(this.number)}.jpg`;
			return url;
		},
		backgroundImageStyle(){
			return {
				backgroundImage: `url(${this.imageSrc})`,
			}
		}
	},
	methods: {
		TwoDigNum(num){
			return this.$options.filters.TwoDigNum(num);
		},
		prevSlide() {
			if (this.number > this.imageMin) {
				this.number -= 1
			} else {
				this.number = this.imageMax
			}

			this.newImage();
		},
		nextSlide() {
			if (this.number < this.imageMax) {
				this.number += 1
			} else {
				this.number = this.imageMin
			}

			this.newImage();
		},
		newImage(){
			const img = new Image();
			this.imageLoading = true;
			img.src = this.bgURL;
			img.onload = () => {
				this.imageSrc = this.bgURL
				this.imageLoading = false;
			}

		},
		setImageSrc(url){
			this.imageSrc = url;
		},
		random(min, max) {
			return Math.round(Math.random() * (max - min) + min);
		},
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
