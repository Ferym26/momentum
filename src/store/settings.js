const module = {
	namespaced: true,

	state: {
		settings: {
			visibility: {
				Winamp: true,
				Weather: true,
				Time: true,
				Greet: true,
				Blockquote: true,
			},
		},
	},

	getters: {
		getSettings(state){
			return state.settings;
		},
		// getLang(state){
		// 	return state.settings?.language ?? 'en';
		// }
	},

	mutations: {
		setData(state, data){
			state.settings = data;
		},
		setSpecificField(state, {name, data}){
			if(typeof data == 'object'){
				state.settings[name] = {...state.settings[name], ...data};
			} else {
				state.settings[name] = data;
			}
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
};

export default module;
