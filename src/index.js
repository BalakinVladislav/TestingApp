import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { router } from "./router.js";
import Home from "./components/Home.js";

var db = openDatabase("Cities2", "3.7.13", "A list of cities", 200000);
let startingData = [];

// render the main component
db.transaction(function (tx, callback) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id integer primary key autoincrement, log)');
		tx.executeSql('SELECT * FROM LOGS', [], function (tx, result) {
			for (var i = 0; i < result.rows.length; i++) {
				let el = {
					id: result.rows.item(i).id,
					city: result.rows.item(i).log
				};
				startingData.push(el);
			}

				ReactDOM.render(
						<Provider store={store}>
	    				<Home startingData={startingData}/>
	  				</Provider>,
	  				document.getElementById('app')
			);
		})	
	});
