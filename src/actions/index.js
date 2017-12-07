export const addCity = (city) => {
	return {
		type: 'ADD_CITY',
		city
	}
}

export const removeCity = (city) => {
	return {
		type: 'DELETE_CITY',
		city
	}
}

export const changeCity = (prevCity, newCity) => {
	return {
		type: 'CHANGE_CITY',
		prevCity,
		newCity
	}
}

export const addInputHelper = (newCity) => {
	return {
		type: 'ADD_INPUT_HELPER',
		newCity
	}
}