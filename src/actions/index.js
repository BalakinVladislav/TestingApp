import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "../store.js";
import { router } from "../router.js";
import Home from "../components/Home.js";



var db = openDatabase("Cities2", "3.7.13", "A list of cities", 200000);

export const asyncAddCity = (city) => dispatch => {
		db.transaction(function (tx) {
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
	db.transaction(function (tx) {
   		tx.executeSql('DELETE FROM LOGS  WHERE id=?', [id]);
    		dispatch({
				type: 'DELETE_CITY',
				id
			});
		});
}

export const changeCity = (id, city) => dispatch => {
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

export const restoreFromWebSql = startingData => dispatch => {
	dispatch({
		type: 'CITIES_RESTORE_FROM_WEB_SQL',
		startingData
	});
}
