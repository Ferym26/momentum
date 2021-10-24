const module = {
	namespaced: true,

	state: {
		settings: {}
	},

	mutations: {
		setData(state, data){
			state.settings = data;
		},
		setSpecificField(state, {name, data}){
			state.settings[name] = {...state.settings[name], ...data};
		}
	},

	actions: {
		loadSettings({commit}){
			const data = localStorage.getItem("momentum_settings");
			if(data != null){
				try{
					commit('setData', JSON.parse(data));
				} catch($err) {
					console.warn('failed to load settings: ', $err);
					localStorage.removeItem("momentum_settings");
				}
			}
		}, 
		saveSettings({state}){
			localStorage.setItem('momentum_settings', JSON.stringify(state.settings))
		},
		changeField({commit, dispatch}, {name, data}){
			commit('setSpecificField', {name, data});
			dispatch('saveSettings');
		}
	},

	getters: {
		getSettings(state){
			return state.settings;
		}
	}
};

export default module;