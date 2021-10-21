<template lang='pug'>
	.bg-slider
		.bg-slider__bg(
			:style='SetBgImg()'
		)
		.bg-slider__nav
			button.bg-slider__btn.bg-slider__btn--prev(
				@click='PrevSlide()'
				aria-label='prev slide'
			)
				img(:src="require(`@/assets/svg/slider-prev.svg`)", alt="bg")
			button.bg-slider__btn.bg-slider__btn--next(
				@click='NextSlide()'
				aria-label='next slide'
			)
				img(:src="require(`@/assets/svg/slider-next.svg`)", alt="bg")
</template>

<script>
export default {
	name: 'BgSlider',
	data() {
		return {
			img: 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg',
		}
	},
	methods: {
		СreateBgURL() {
			// const baseURL = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';

		},
		SetBgImg() {
			return 'background-image: url("https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg")'
		},
		PrevSlide() {
			console.log('prev');
		},
		NextSlide() {
			console.log('next');
		},
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
