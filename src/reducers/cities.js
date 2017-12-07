export default function cities(state = {
	data: ["Ekaterinburg", "Moscow", "Saint-Petersburg", "Kazan"],
	addCity: ''
    }, action) {
	switch (action.type) {
		case 'ADD_CITY':

		return {data: [...state.data, action.city],
			addCity: ''}

		case 'DELETE_CITY':

		return {data: [...state.data].filter(city1 => !(city1 === action.city)),
			addCity: ''}

		case 'CHANGE_CITY':
		console.log(action.prevCity);
		let copyingState = Object.assign({}, this.state);
		let index = copyingState.data.indexOf(action.prevCity);
		let newState = copyingState.data.splice(index, 1, action.newCity);

		return copyingState

		case 'ADD_INPUT_HELPER':
		console.log(action.newCity);

		return {
			data: [...state.data],
			addCity: action.newCity
		}

		default:
		return state;
	}
}

h16bit