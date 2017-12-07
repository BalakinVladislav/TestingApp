import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
	addCity,
	removeCity,
	changeCity,
	addInputHelper
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


    handleCityChange(e) {
    	const {
    		changeCity
    	} = this.props;

    	const prevCity = e.target.dataset.city;
    	const newCity = e.target.value;
    	changeCity(prevCity, newCity);
    }

    handleAddCityChange(e) {
    	const {
    		addInputHelper
    	} = this.props;

    	const newCity = e.target.value;
    	addInputHelper(newCity);
    }

    deleteCity(e) {
    	const {
    		removeCity
    	} = this.props;

    	const cityName = e.target.dataset.city;
    	removeCity(cityName);
    }

    addCity(e) {
  		const {
				addCity,
			} = this.props;

		let city = e.target.dataset.city;
		addCity(city);

	}

    render() {
    	const {cities} = this.props;
    	const addCity = cities.addCity;

        return (
        	<div> {cities.data.map((city, id) => (
        		<div key={id}>
            		{city}
            		<button onClick={this.deleteCity} data-city={city}>Удалить город</button>
            		<input type="text" data-city={city} value={city} onChange={this.handleCityChange}></input>
            	</div>)
            	)}
          		<input type="text" value={addCity} onChange={this.handleAddCityChange}></input>
          		<button data-city={addCity} onClick={this.addCity}>Добавить город</button>
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
		addInputHelper
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
