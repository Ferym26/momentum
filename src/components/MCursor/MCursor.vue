<template lang='pug'>
	.m-cursor(
		ref="cursor"
		:class='{"is-active": isActive}'
	)
		.m-cursor-circle
</template>

<script>
import { gsap } from 'gsap'
export default {
	name: 'MCursor',
	data() {
		return {
			isActive: false,
		}
	},
	mounted() {
		this.move();
	},
	methods: {
		move() {
			const _this = this;
			const { cursor } = this.$refs;
			const cursorTL = gsap.timeline();
			const cWidth = 12;
			let mouseX = 0;
			let mouseY = 0;
			const btns = document.querySelectorAll('button');

			document.addEventListener('mousemove', function(e) {
				mouseX = e.pageX;
				mouseY = e.pageY;
				cursorTL.to(cursor, {
					left: mouseX - (cWidth / 2),
					top: mouseY - (cWidth / 2),
					duration: 0,
				});
			});

			btns.forEach(btn => {
				btn.addEventListener('mouseenter', function() {
					_this.isActive = true;
				});
				btn.addEventListener('mouseleave', function() {
					_this.isActive = false;
				});
			})
		},
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
