<template lang="pug">
	#app.wrapper
		BgSlider
		Winamp
		Weather
		Blockquote
		Time
		Greet
		Settings
		MCursor
</template>

<script>
import BgSlider from "@/components/BgSlider/BgSlider";
import Winamp from "@/components/Winamp/Winamp";
import Weather from "@/components/Weather/Weather";
import Blockquote from "@/components/Blockquote/Blockquote";
import Time from "@/components/Time/Time";
import Greet from "@/components/Greet/Greet";
import Settings from "@/components/Settings/Settings";
import MCursor from "@/components/MCursor/MCursor";
import checklist from "@/utils/checklist.js"
export default {
	name: 'App',
	components: {
		BgSlider,
		Winamp,
		Weather,
		Blockquote,
		Time,
		Greet,
		Settings,
		MCursor,
	},
	mixins: [checklist],
	created() {
		this.checkList();
	},
}
</script>

<style lang="scss">
@import './assets/styles/style';
</style>
