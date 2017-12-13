import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Pagination } from 'react-bootstrap';
import {
	asyncAddCity,
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
			addCity: '',
			currentPage: 1
		};

		this.deleteCity = this.deleteCity.bind(this);
    	this.asyncAddCity = this.asyncAddCity.bind(this);
    	this.handleCityChange = this.handleCityChange.bind(this);
   		this.handleAddCityChange = this.handleAddCityChange.bind(this);
   		this.handleClick = this.handleClick.bind(this);
	}

	componentWillMount() {
    const {startingData} = this.props;
		const {
			restoreFromWebSql
		} = this.props

		restoreFromWebSql(startingData);

	}


    handleCityChange(id, city) {
    	const {
    		changeCity
    	} = this.props;

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

    	removeCity(id);
    }

    asyncAddCity(e) {
  		const {
				asyncAddCity,
				cities
			} = this.props;

		let city = cities.addCity;
   		asyncAddCity(city);
	}

	 handleClick(eventKey) {

        this.setState({
          currentPage: eventKey
        });
      }

    render() {
    	const {cities} = this.props;
    	const addCity = cities.addCity;
    	const citiesData = cities.data;
    	const {currentPage} = this.state;
    	const citiesPerPage = 2;

    	const indexOfLastCity = currentPage * citiesPerPage;
        const indexOfFirstCity = indexOfLastCity - citiesPerPage;
        const currentCities = citiesData.slice(indexOfFirstCity, indexOfLastCity);

        const renderCities = currentCities.map((city, index) => {
          return <li key={index}>{city.data}</li>;
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(citiesData.length / citiesPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = 
        <Pagination
	        prev
	        next
	        first
	        last
	        ellipsis
	        boundaryLinks
          	bsSize="medium"
          	items={Math.ceil(citiesData.length / citiesPerPage)}
          	activePage={this.state.currentPage}
          	onSelect={this.handleClick}
        />

        return (
        	<div> {currentCities.map((city, id) => (
        		<div key={id}>
            		<li key={id}>{city.city}</li>
            		<button onClick={() => this.deleteCity(city.id)} data-city={city.city}>Удалить город</button>
            		<input type="text" value={city.city} onChange={(e) => this.handleCityChange(city.id,e.target.value)}></input>
            	</div>)
            	)}
	        	<ul>
	              	{renderPageNumbers}
	            </ul>
          		<input type="text" value={addCity} onChange={this.handleAddCityChange}></input>
          		<button onClick={this.asyncAddCity}>Добавить город</button>
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
		asyncAddCity,
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
		...ownProps,
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Home);
