import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		dayPeriod: null, // 0 ночь, 1 утро, 2 день, 3 вечер
	},
	getters: {
		getDayPeriod (state) {
			return state.dayPeriod;
		},
	},
	mutations: {
		setDayPeriod (state, payload) {
			state.dayPeriod = payload;
		},
	},
	actions: {
		DayPeriod ({ commit }) {
			const currentHour = +new Intl.DateTimeFormat('en-En', {hour: '2-digit', hour12: false}).format(new Date()); // получаем числовое значение часа
			if (currentHour >= 0 && currentHour < 6) {
				commit('setDayPeriod', 0);
			}
			if (currentHour >= 6 && currentHour < 12) {
				commit('setDayPeriod', 1);
			}
			if (currentHour >= 12 && currentHour < 18) {
				commit('setDayPeriod', 2);
			}
			if (currentHour >= 18 && currentHour < 24) {
				commit('setDayPeriod', 3);
			}
		},
	},
});
