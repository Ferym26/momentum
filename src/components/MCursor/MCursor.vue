<template lang='pug'>
	.m-cursor(
		ref="cursor"
		:class='{"is-active": isActive, "is-visible": isVisible}'
	)
		.m-cursor-circle
</template>

<script>
import { mapGetters } from 'vuex'
import { gsap } from 'gsap'
export default {
	name: 'MCursor',
	data() {
		return {
			isActive: false,
		}
	},
	computed: {
		...mapGetters({
			settings: 'settings/getSettings',
		}),
		isVisible() {
			return this.settings?.visibility.MCursor ?? true
		},
	},
	watch: {
		isVisible() {
			if (this.isVisible) {
				document.body.classList.add('m-cursor-on');
			} else {
				document.body.classList.remove('m-cursor-on');
			}
		},
	},
	mounted() {
		if (this.isVisible) {
			document.body.classList.add('m-cursor-on');
		}
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
