const checklist = {
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
					task: 'Перевод приложения на два языка (en/ru)',
					value: 15,
				},
				{
					task: 'Получение фонового изображения от API',
					value: 0,
				},
				{
					task: 'Настройки приложения',
					value: 20,
				},
				{
					task: 'Дополнительный функционал на выбор: кастомный курсор',
					value: 10,
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
	},
}

export default checklist


