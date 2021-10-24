<template lang='pug'>
	.winamp.component(
		:class='{"is-visible": isVisible}'
	)
		.winamp__player
			audio(
				ref='audio'
			)
				source(type="audio/mp3" :src="require(`@/assets/sounds/${activeTrack.src}`)")
		.winamp__nav
			button.winamp__btn.winamp__btn--prev(
				@click.prevent='prevTrack()'
			)
				img(:src="require(`@/assets/svg/play-prev.svg`)", alt="bg")
			button.winamp__btn.winamp__btn--toggle(
				@click.prevent='togglePlay()'
			)
				img.play(
					v-if='!isPlay'
					:src="require(`@/assets/svg/play.svg`)"
					alt="bg"
				)
				img.pause(
					v-else
					:src="require(`@/assets/svg/pause.svg`)",
					alt="bg"
				)
			button.winamp__btn.winamp__btn--next(
				@click.prevent='nextTrack()'
			)
				img(:src="require(`@/assets/svg/play-next.svg`)", alt="bg")
		.winamp__list
			.winamp__track(
				v-for='(item, i) in audio'
				:class='{active: activeTrackId === i}'
				@click='play(item, i)'
			)
				.winamp__track-icon
					img.play(
						v-if="activeTrackId !== i || !isPlay"
						:src="require(`@/assets/svg/play.svg`)"
						alt="bg"
					)
					img.pause(
						v-else
						:src="require(`@/assets/svg/pause.svg`)",
						alt="bg"
					)
				.winamp__track-title {{ item.title }}
</template>

<script>
import { mapGetters } from 'vuex'
import audio from '@/assets/data/audio'
export default {
	name: 'Winamp',
	data() {
		return {
			audio,
			isPlay: false,
			activeTrack: {},
			activeTrackId: 0,
		}
	},
	computed: {
		...mapGetters({
			settings: 'settings/getSettings',
		}),
		isVisible() {
			return this.settings?.visibility.Winamp ?? true
		},
	},
	created() {
		this.setActiveTrack();
	},
	mounted() {
		this.$refs.audio.volume = 0.05;
		this.autoPlayNext();
	},
	methods: {
		setActiveTrack() {
			this.activeTrack = audio[0];
		},
		togglePlay() {
			if (this.isPlay) {
				this.$refs.audio.pause();
				this.isPlay = false;
			} else {
				this.$refs.audio.play();
				this.isPlay = true;
			}
		},
		play(track, index) {
			if(index === this.activeTrackId){
				this.togglePlay();
				return;
			} else if(index !== undefined){
				this.activeTrackId = index;
			}

			this.$refs.audio.pause();
			this.activeTrack = track;
			this.$refs.audio.load();
			this.$refs.audio.currentTime = 0;
			// setTimeout(() => {
				this.$refs.audio.play(); // TODO: я не понял почему это работает именно так
			// }, 100)
			this.isPlay = true;
		},
		nextTrack() {
			if (this.activeTrackId < this.audio.length - 1) {
				this.activeTrackId += 1
			} else {
				this.activeTrackId = 0
			}
			this.play(this.audio[this.activeTrackId])
		},
		prevTrack() {
			if (this.activeTrackId > 0) {
				this.activeTrackId -= 1
			} else {
				this.activeTrackId = this.audio.length - 1
			}
			this.play(this.audio[this.activeTrackId])
		},
		autoPlayNext() {
			const _this = this;
			this.$refs.audio.addEventListener('ended', function() {
				if (_this.activeTrackId < _this.audio.length - 1) {
					_this.activeTrackId += 1
				} else {
					_this.activeTrackId = 0
				}
				_this.play(_this.audio[_this.activeTrackId]);
			});
		},
	},
}
</script>

<style lang='sass' src='./style.sass'></style>
