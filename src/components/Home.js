import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
	addCity,
	removeCity,
	changeCity,
	addInputHelper,
	restoreFromWebSql
} from '../actions';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			addCity: ''
		};

		this.deleteCity = this.deleteCity.bind(this);
    	this.addCity = this.addCity.bind(this);
    	this.handleCityChange = this.handleCityChange.bind(this);
   		this.handleAddCityChange = this.handleAddCityChange.bind(this);
	}

	componentWillMount() {
		const {
			restoreFromWebSql
		} = this.props

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
				restoreFromWebSql(startingData);

			})
		}, null);

	}


    handleCityChange(id, city) {
    	const {
    		changeCity
    	} = this.props;
    	var db = openDatabase("Cities2", "3.7.13", "A list of cities", 200000);
		db.transaction(function (tx) {
    		tx.executeSql('UPDATE LOGS SET log=? WHERE id=?', [city, id]);
		});

    	changeCity(id, city);
    }

    handleAddCityChange(e) {
    	const {
    		addInputHelper
    	} = this.props;

    	const newCity = e.target.value;
    	addInputHelper(newCity);
    }

    deleteCity(id) {
    	const {
    		removeCity
    	} = this.props;

    	var db = openDatabase("Cities2", "3.7.13", "A list of cities", 200000);
		db.transaction(function (tx) {
    		tx.executeSql('DELETE FROM LOGS  WHERE id=?', [id]);
		});

    	removeCity(id);
    }

    addCity(e) {
  		const {
				addCity,
				cities
			} = this.props;

		let city = cities.addCity;

		var db = openDatabase("Cities2", "3.7.13", "A list of cities", 200000);
		db.transaction(function (tx) {
   			tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id integer primary key autoincrement, log)');
   			tx.executeSql('INSERT INTO LOGS (log) VALUES (?)', [city]);
   			tx.executeSql('SELECT * FROM LOGS', [], function (tx, result) {
				let index = result.rows.length;
				let id = result.rows.item(index-1).id;
				addCity(city, id);
			})
   		}, null);

	}

    render() {
    	const {cities} = this.props;
    	const addCity = cities.addCity;

        return (
        	<div> {cities.data.map((city, id) => (
        		<div key={id}>
            		{city.city}
            		<button onClick={() => this.deleteCity(city.id)} data-city={city.city}>Удалить город</button>
            		<input type="text" value={city.city} onChange={(e) => this.handleCityChange(city.id,e.target.value)}></input>
            	</div>)
            	)}
          		<input type="text" value={addCity} onChange={this.handleAddCityChange}></input>
          		<button onClick={this.addCity}>Добавить город</button>
          </div>)
	}
}

function mapStateToProps(state) {
	return {
		cities: state.cities
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addCity,
		removeCity,
		changeCity,
		addInputHelper,
		restoreFromWebSql
	}, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	return {
		...stateProps,
		...dispatchProps,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Home);
