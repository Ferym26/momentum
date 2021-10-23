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
	created() {
		this.checkList();
	},
	methods: {
		checkList() {
			const taskArr = []; // массив объектов с заданиями
			// список заданий со значениями самооценки
			const taskList = [
				{
					task: 'Часы и календарь',
					value: 15,
				},
				{
					task: 'Приветствие +10',
					value: 10,
				},
				{
					task: 'Смена фонового изображения',
					value: 20,
				},
				{
					task: 'Виджет погоды',
					value: 15,
				},
				{
					task: 'Виджет цитата дня',
					value: 10,
				},
				{
					task: 'Аудиоплеер',
					value: 15,
				},
				{
					task: 'Продвинутый аудиоплеер',
					value: 0,
				},
				{
					task: 'Перевод приложения на два языка (en/ru или en/be)',
					value: 0,
				},
				{
					task: 'Получение фонового изображения от API',
					value: 0,
				},
				{
					task: 'Настройки приложения',
					value: 0,
				},
				{
					task: 'Дополнительный функционал на выбор',
					value: 0,
				},
			];
			// конструктор строки задания
			function Row (task, value) {
				this.task = task;
				this.value = value;
			}
			// наполняем массив
			taskList.forEach((item) => {
				taskArr.push(new Row(item.task, item.value))
			});
			// считаем сумму значений
			const calcSumm = () => {
				let summ = 0;
				taskArr.forEach((item) => {
					summ += item.value
				})
				return summ
			};
			// выводим в консоль таблицу списка заданий и вычислинный результат
			console.table([...taskArr, new Row('Итого', calcSumm())]);
		},
	}
}
</script>

<style lang="scss">
@import './assets/styles/style';
</style>
