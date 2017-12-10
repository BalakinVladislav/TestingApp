export const addCity = (city, id) => {
	return {
		type: 'ADD_CITY',
		city,
		id
	}
}

export const removeCity = (id) => {
	return {
		type: 'DELETE_CITY',
		id
	}
}

export const changeCity = (id, city) => {
	return {
		type: 'CHANGE_CITY',
		id,
		city
	}
}

export const addInputHelper = (newCity) => {
	return {
		type: 'ADD_INPUT_HELPER',
		newCity
	}
}

export const restoreFromWebSql = (startingData) => {
	return {
		type: 'CITIES_RESTORE_FROM_WEB_SQL',
		startingData
	}
}