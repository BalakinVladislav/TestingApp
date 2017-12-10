export default function cities(state = 
	{
		data: [],
		addCity: ''
    	}, action) {
	switch (action.type) {
		case 'ADD_CITY':
		const cityToAdd = {
			id: action.id,
			city: action.city
		};

		return {
				data: [...state.data, cityToAdd],
				addCity: ''
				}

		case 'DELETE_CITY':

		return {
				data: [...state.data].filter(city1 => !(city1.id === action.id)),
				addCity: ''
				}

		case 'CHANGE_CITY':
			function finder(element, index, array) {
	          	if (element.id === action.id) {
	            return true;
	          	}
	        }
			let copyingState = JSON.parse(JSON.stringify(state));
			let index = copyingState.data.findIndex(finder);
			let newData = copyingState.data;
			let newState = newData.splice(index, 1, {
				id: action.id,
				city: action.city
			});

		return {
			data: [...newData],
			addCity: state.addCity
		}

		case 'ADD_INPUT_HELPER':

		return {
			data: [...state.data],
			addCity: action.newCity
		}

		case 'CITIES_RESTORE_FROM_WEB_SQL':

		return {
			data: [...state.data, ...action.startingData],
			addCity: ''
		}

		default:
		return state;
	}
}
<<<<<<< HEAD
=======

>>>>>>> 790ac68a9b4235f8c4aafc2237b1053ae930c51b
