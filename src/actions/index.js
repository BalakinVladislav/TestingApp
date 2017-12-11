export const asyncAddCity = (city) => dispatch => {
		var db = openDatabase("Cities2", "3.7.13", "A list of cities", 200000);
		db.transaction(function (tx) {
   			tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id integer primary key autoincrement, log)');
   			tx.executeSql('INSERT INTO LOGS (log) VALUES (?)', [city]);
   			tx.executeSql('SELECT * FROM LOGS', [], function (tx, result) {
				let index = result.rows.length;
				let id = result.rows.item(index-1).id;
				dispatch({
					type: 'ADD_CITY',
					city,
					id
				});
   		}, null);
	});
}

export const removeCity = (id) => dispatch => {
	var db = openDatabase("Cities2", "3.7.13", "A list of cities", 200000);
	db.transaction(function (tx) {
   		tx.executeSql('DELETE FROM LOGS  WHERE id=?', [id]);
    		dispatch({
				type: 'DELETE_CITY',
				id
			});
		});
}

export const changeCity = (id, city) => dispatch => {
	var db = openDatabase("Cities2", "3.7.13", "A list of cities", 200000);
	db.transaction(function (tx) {
   		tx.executeSql('UPDATE LOGS SET log=? WHERE id=?', [city, id]);
    		dispatch({
				type: 'CHANGE_CITY',
				id,
				city
			});
	});
}

export const addInputHelper = (newCity) => {
	return {
		type: 'ADD_INPUT_HELPER',
		newCity
	}
}

export const restoreFromWebSql = () => dispatch => {
	var db = openDatabase("Cities2", "3.7.13", "A list of cities", 200000);
	let startingData = [];
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id integer primary key autoincrement, log)');
		tx.executeSql('SELECT * FROM LOGS', [], function (tx, result) {
			for (var i = 0; i < result.rows.length; i++) {
				let el = {
					id: result.rows.item(i).id,
					city: result.rows.item(i).log
				};
				startingData.push(el);
			}
			dispatch({
				type: 'CITIES_RESTORE_FROM_WEB_SQL',
				startingData
			});

			})
	}, null);
}