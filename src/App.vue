<template lang="pug">
	#app.wrapper
		BgSlider
		Winamp
		Weather
		Blockquote
		Time
		Greet
</template>

<script>
import BgSlider from "@/components/BgSlider/BgSlider";
import Winamp from "@/components/Winamp/Winamp";
import Weather from "@/components/Weather/Weather";
import Blockquote from "@/components/Blockquote/Blockquote";
import Time from "@/components/Time/Time";
import Greet from "@/components/Greet/Greet";
export default {
	name: 'App',
	components: {
		BgSlider,
		Winamp,
		Weather,
		Blockquote,
		Time,
		Greet,
	},
}
</script>

<style lang="scss">
@import './assets/styles/style';
</style>
